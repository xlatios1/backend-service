import { ApolloServer } from '@apollo/server'
import { ApolloServerErrorCode } from '@apollo/server/errors'
import { expressMiddleware } from '@as-integrations/express5'

import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { DB } from './database'
import { resolvers } from './graphql/resolvers'
import { typeDefs } from './graphql/schemas'
import { validateToken } from './middleware/validateToken'

dotenv.config()
const app = express()

const apolloServer = new ApolloServer({
	resolvers,
	typeDefs,
	introspection: true, //process.env.NODE_ENV !== 'production',
	formatError: (err) => {
		if (
			err.extensions?.code === ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
		) {
			return {
				...err,
				message: "Your query doesn't match the schema. Try double-checking it!",
			}
		}
		if (err.extensions?.code) {
			return {
				message: err.message,
				code: err.extensions.code,
			}
		}

		console.log('Failed to handle error. Error:', err)
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
