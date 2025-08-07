export const userTypeDefs = `#graphql
	type Query {
		checkUserExists: AuthResponse
    }

	type Mutation{
		authenticate(username: String!, password: String!, deviceToken: String): AuthResponse! 
		signup(username: String!, password: String!, displayName: String!, imageUrl: String): AuthResponse!
		signout: Boolean!
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
`
