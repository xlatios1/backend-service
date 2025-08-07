export const recipeTypeDefs = `#graphql
    type Query {
        getRecipes(first: Int = 10, after: String = 0): RecipeConnection!
        getInstructions(recipeId: ID!): [Instruction!]!
    }

    type Mutation {
        addRecipe(recipe: AddRecipeInput!): Recipe!
        updateRecipe(recipe: UpdateRecipeInput!): Boolean!
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
        instructions: [Instruction!]!
    }

    type Instruction {
        id: ID!
        item: String!
        description: String
        order: Int!
    }

    input AddRecipeInput {
        recipeName: String!
        description: String
        note: String
        imageUrl: String
        createdBy: Int!
        steps: [AddInstructionInput!]!
    }

    input AddInstructionInput {
        item: String!
        description: String
        order: Int!
    }

    input UpdateRecipeInput {
        id: ID!
        recipeName: String!
        description: String
        note: String
        imageUrl: String
        steps: [UpdateInstructionInput!]
    }

    input UpdateInstructionInput {
        item: String!
        description: String
        order: Int!
    }
`
