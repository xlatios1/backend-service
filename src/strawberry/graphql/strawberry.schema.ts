export const strawberryTypeDefs = `#graphql
	type Query {
		getAllStrawberry: [Strawberry!]
		getStrawberryById: [Strawberry!]
    }
	type Mutation{
		addStrawberry(id: ID!, count: Int!, comments: String): [Strawberry!]
	}

    type Strawberry {
		id: ID!
		count: Int!
		userId: User!
		comments: String
		createdAt: String!
		updatedAt: String!
	}

`
