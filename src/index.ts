import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { DB } from './database'
import { validateToken } from './middleware/validateToken'
import { typeDefs } from './graphql/schemas'
import { resolvers } from './graphql/resolvers'

dotenv.config()
const app = express()

const apolloServer = new ApolloServer({
	resolvers,
	typeDefs,
	introspection: true, //process.env.NODE_ENV !== 'production',
})

await apolloServer.start()

app.use(
	'/graphql',
	cors(),
	express.json(),
	expressMiddleware(apolloServer, {
		context: async ({ req }) => {
			try {
				const authToken = req.headers.authorization
				if (!authToken) return { user: null }

				const user = await validateToken(req)
				return { user }
			} catch (error) {
				console.error('Authentication error:', error.message)
				throw new Error('Authentication failed')
			}
		},
	})
)

const PORT = Number(process.env.PORT)

app.listen(PORT, () => {
	console.log(`\nGo to http://localhost:${PORT}/graphql to run queries!`)
	DB.init()
})
