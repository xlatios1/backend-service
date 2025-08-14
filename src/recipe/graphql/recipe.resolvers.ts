import { ForbiddenError } from '@errors/ForbiddenError'
import { FORBIDDEN_ERROR_MESSAGE } from '@src/constants/constants'
import { RecipeService } from '@src/recipe/service/recipe.service'
import { TagsService } from '@src/tags/service/tags.service'
import { UserService } from '@src/users/service/users.service'
import { InstructionsService } from '../service/instructions.service'

const recipeService = new RecipeService()
const instructionService = new InstructionsService()
const userService = new UserService()
const tagsService = new TagsService()

export const recipeResolvers = {
	Query: {
		getInstructions: async (_parent, args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			const { recipeId } = args
			return instructionService.getInstructionsById(Number(recipeId))
		},
	},

	Recipe: {
		createdBy: async (parent, _args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			return userService.getUser(Number(parent.createdBy))
		},

		tags: async (parent, _args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			return tagsService.getTagsByRecipeId(Number(parent.id))
		},

		instructions: async (parent, _args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			return instructionService.getInstructionsById(Number(parent.id))
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

			const { id, recipe } = args
			return recipeService.updateRecipe(id, recipe)
		},

		deleteRecipe: async (_parent, args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			const { id } = args
			return recipeService.deleteRecipe(Number(id))
		},
	},
}
