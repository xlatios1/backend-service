import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { recipeResolvers } from './recipe/graphql/recipe.resolvers'
import { recipeTypeDefs } from './recipe/graphql/recipe.schema'
import { strawberryResolvers } from './strawberry/graphql/strawberry.resolvers'
import { strawberryTypeDefs } from './strawberry/graphql/strawberry.schema'
import { userResolvers } from './users/graphql/user.resolvers'
import { userTypeDefs } from './users/graphql/user.schema'

export const typeDefs = mergeTypeDefs([
	userTypeDefs,
	strawberryTypeDefs,
	recipeTypeDefs,
])

export const resolvers = mergeResolvers([
	userResolvers,
	strawberryResolvers,
	recipeResolvers,
])
