import { FORBIDDEN_ERROR_MESSAGE } from '@src/constants/constants'
import { RecipeService } from '@src/recipe/service/recipe.service'
import { decodeCursor } from '@src/utils/cursor'
import { ForbiddenError } from 'apollo-server-errors'
import { TagsService } from '../service/tags.service'

const tagsService = new TagsService()
const recipeService = new RecipeService()

export const tagsResolvers = {
	Query: {
		getAllTags: async (_, __, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			return await tagsService.getAllTags()
		},

		getRecipesByTagId: async (_, args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			const { tagId, first, after } = args
			const afterId = after ? decodeCursor(after) : 0

			return await recipeService.getRecipesByTagId(tagId, first, afterId)
		},
	},
	Mutation: {
		addTag: async (_, args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			const { tag } = args
			return await tagsService.addTag(tag)
		},
		updateTags: async (_, args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			const { updates } = args
			return await tagsService.updateTags(updates)
		},
		deleteTag: async (_, args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			const { id } = args
			return await tagsService.safeDeleteTag(id)
		},
	},
}
