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
`;
