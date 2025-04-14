import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { DB } from './database'
import { validateToken } from './middleware/validateToken'
import { typeDefs } from './graphql/schemas'
import { resolvers } from './graphql/resolvers'
import { ApolloServerErrorCode } from '@apollo/server/errors'

dotenv.config()
const app = express()

const apolloServer = new ApolloServer({
	resolvers,
	typeDefs,
	introspection: true, //process.env.NODE_ENV !== 'production',
	formatError: (err) => {
		if (
			err.extensions.code === ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
		) {
			return {
				...err,
				message: "Your query doesn't match the schema. Try double-checking it!",
			}
		}
		if (err.extensions?.code) {
			const a = {
				message: err.message,
				code: err.extensions.code,
			}
			console.log(a)
			return a
		}

		console.log('failed to handle error', err)
		return err
	},
})

await apolloServer.start()

app.use(
	'/graphql',
	cors({ origin: '*' }),
	express.json(),
	expressMiddleware(apolloServer, {
		context: async ({ req }) => {
			const authToken = req.headers.authorization
			if (!authToken) return { user: null }

			const user = await validateToken(req)
			return { user, authToken }
		},
	})
)

const PORT = Number(process.env.PORT)

app.listen(PORT, '0.0.0.0', () => {
	console.log(`\nGo to http://localhost:${PORT}/graphql to run queries!`)
	DB.init()
})
