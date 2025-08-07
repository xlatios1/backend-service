import { ForbiddenError } from '@errors/ForbiddenError'
import { FORBIDDEN_ERROR_MESSAGE } from '@src/constants/constants'
import { RecipeService } from '@src/recipe/service/recipe.service'
import { UserService } from '@src/users/service/users.service'
import { decodeCursor } from '@src/utils/cursor'

const recipeService = new RecipeService()
const userService = new UserService()

export const recipeResolvers = {
	Query: {
		getRecipes: async (_parent, args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			const { first, after } = args
			const afterId = after ? decodeCursor(after) : 0
			console.log('after ', after)
			return recipeService.getRecipes(first, afterId)
		},
		getInstructions: async (_parent, args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			const { recipeId } = args
			return recipeService.getInstructionsById(Number(recipeId))
		},
	},

	Recipe: {
		createdBy: async (parent, _args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			// assertResourceOwner({
			// 	currentUserId: Number(user.id),
			// 	resourceOwnerId: Number(parent.userId),
			// })

			return userService.getUser(Number(parent.createdBy))
		},

		instructions: async (parent, _args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)
			console.log('HERE', parent)
			return recipeService.getInstructionsById(Number(parent.id))
		},
	},

	Mutation: {
		addRecipe: async (_parent, args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			const { recipe } = args
			return recipeService.addRecipe(recipe)
		},

		updateRecipe: async (_parent, args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			const { recipe } = args
			return recipeService.updateRecipe(recipe)
		},

		deleteRecipe: async (_parent, args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			const { id } = args
			return recipeService.deleteRecipe(Number(id))
		},
	},
}
