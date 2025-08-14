import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { recipeResolvers } from './recipe/graphql/recipe.resolvers'
import { recipeTypeDefs } from './recipe/graphql/recipe.schema'
import { strawberryResolvers } from './strawberry/graphql/strawberry.resolvers'
import { strawberryTypeDefs } from './strawberry/graphql/strawberry.schema'
import { tagsResolvers } from './tags/graphql/tags.resolvers'
import { tagsTypeDefs } from './tags/graphql/tags.schema'
import { userResolvers } from './users/graphql/user.resolvers'
import { userTypeDefs } from './users/graphql/user.schema'

export const typeDefs = mergeTypeDefs([
	userTypeDefs,
	strawberryTypeDefs,
	tagsTypeDefs,
	recipeTypeDefs,
])

export const resolvers = mergeResolvers([
	userResolvers,
	strawberryResolvers,
	tagsResolvers,
	recipeResolvers,
])
