export const recipeTypeDefs = `#graphql
    type Query {
        getInstructions(recipeId: ID!): [Instruction!]!
    }

    type Mutation {
        addRecipe(recipe: AddRecipeInput!): Boolean!
        updateRecipe(id: ID!, recipe: UpdateRecipeInput!): Boolean!
        deleteRecipe(id: ID!): Boolean!
    }

    type RecipeConnection {
        edges: [RecipeEdge!]!
        pageInfo: PageInfo!
    }

    type RecipeEdge {
        node: Recipe!
        cursor: String
    }

    type PageInfo {
        hasNextPage: Boolean!
        endCursor: String
    }

    type Recipe {
        id: ID!
        recipeName: String!
        description: String
        note: String
        imageUrl: String
        createdBy: User!
        createdAt: String!
        updatedAt: String!
        tags: [Tag]!
        instructions: [Instruction!]!
    }

    type Instruction {
        id: ID!
        item: String
        description: String
        imageUrl: String
        order: Int!
    }

    type Tag {
        id: ID!
        tag: String!
        createdAt: String!
        updatedAt: String!
    }

    input AddRecipeInput {
        recipeName: String!
        description: String
        note: String
        imageUrl: String
        createdBy: Int!
        tags: [ID!]!
        instructions: [AddInstructionInput!]!
    }

    input AddInstructionInput {
        item: String
        description: String
        order: Int!
    }

    input UpdateRecipeInput {
        recipeName: String
        description: String
        note: String
        imageUrl: String
        tags: [ID!]
        instructions: [AddInstructionInput!]
    }
`
