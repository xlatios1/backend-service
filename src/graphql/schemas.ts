// import { makeExecutableSchema } from '@graphql-tools/schema'
// import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
// import { resolvers } from './resolvers'

export const typeDefs = `#graphql
	type Strawberry {
		id: ID!
		count: Int!
		userId: User!
		comments: String
		createdAt: String!
		updatedAt: String!
	}
	type User {
		id: String!
		username: String!
		displayName: String!
		imageUrl: String
		createdAt: String!
		updatedAt: String!
	}
	type AuthResponse {
		id: ID!
		username: String!
		displayName: String!
		imageUrl: String
		deviceToken: String!
	}
	type Query {
		getAllStrawberry: [Strawberry!]
		getStrawberryById: [Strawberry!]
		checkUserExists: AuthResponse
    }
	type Mutation{
		authenticate(username: String!, password: String!, deviceToken: String): AuthResponse! 
		signup(username: String!, password: String!, displayName: String!, imageUrl: String): AuthResponse!
		signout: Boolean!
		addStrawberry(id: ID!, count: Int!, comments: String): [Strawberry!]
	}
`

// const schema = makeExecutableSchema({
// 	typeDefs,
// 	resolvers,
// })

// // Process directives in schema
// export const schemaWithDirectives = mapSchema(schema, {
// 	[MapperKind.OBJECT_FIELD]: (fieldConfig) => {
// 		const protectedDirective = getDirective(schema, fieldConfig, 'protected')
// 		if (protectedDirective) {
// 			fieldConfig.extensions = {
// 				...(fieldConfig.extensions || {}),
// 				protected: true,
// 			}
// 			console.log('Directive applied:', fieldConfig.extensions) // Debugging
// 		}
// 		return fieldConfig
// 	},
// })
