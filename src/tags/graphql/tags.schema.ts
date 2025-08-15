export const tagsTypeDefs = `#graphql
    type Query {
        getAllTags: [Tag]!
        getRecipesByTagId(tagId: ID!, first: Int=10, after: String=0): RecipeConnection!
    }

    type Mutation {
        addTag(tag: AddTagInput!): Tag!
        updateTags(updates: [UpdateTagInput!]!): Boolean!
        deleteTag(id: ID!): Boolean!
    }

    type Tag {
        id: ID!
        tag: String!
        order: Int!
        createdAt: String!
        updatedAt: String!
    }

    input AddTagInput {
        tag: String!
        order: Int!
    }

    input UpdateRecipeTagInput {
        recipeId: ID!
        tagIds: [ID!]!
    }

    input UpdateTagInput {
        id: ID!
        tag: String
        order: Int
    }
`
