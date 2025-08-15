import { NotFoundError } from '@src/errorHandlers/NotFoundError'
import { RecipesDBModel } from '@src/recipe/models/recipe.model'
import { TagsService } from '@src/tags/service/tags.service'
import { encodeCursor } from '@src/utils/cursor'
import transaction from '@src/utils/transactions'
import { Op } from 'sequelize'
import { RecipeTagsDBModel } from '../models/recipeTags.model'
import { AddRecipeType, UpdateRecipeType } from '../types/recipe.type'
import { InstructionsService } from './instructions.service'

export class RecipeService {
	private instructionsService = new InstructionsService()
	private tagsService = new TagsService()

	async getRecipesByTagId(
		tagId: string,
		first: number = 10,
		afterId: number = 0
	) {
		const taggedRecipes = await RecipeTagsDBModel.findAll({
			attributes: ['recipeId'],
			where: { tagId, recipeId: { [Op.gt]: afterId } },
			order: [['recipeId', 'ASC']],
			limit: first,
			raw: true,
		})

		const recipes = await RecipesDBModel.findAll({
			where: { id: { [Op.in]: taggedRecipes.map((r) => r.recipeId) } },
			order: [['id', 'ASC']],
			raw: true,
		})

		const edges = recipes.map((recipe) => ({
			node: recipe,
			cursor: encodeCursor(recipe.id),
		}))

		const last = recipes[recipes.length - 1]

		const hasNextPage = last
			? (await RecipesDBModel.count({ where: { id: { [Op.gt]: last.id } } })) >
			  0
			: false

		return {
			edges,
			pageInfo: {
				hasNextPage,
				endCursor: last ? encodeCursor(last.id) : null,
			},
		}
	}

	async getRecipeById(id: number) {
		const recipe = await RecipesDBModel.findOne({
			where: { id },
			raw: true,
		})

		if (!recipe) {
			throw new NotFoundError(`Recipe with ID ${id} not found`)
		}

		return recipe
	}

	async addRecipe({
		recipeName,
		description,
		note,
		imageUrl,
		createdBy,
		tags,
		instructions,
	}: AddRecipeType) {
		if (!tags.length || !instructions.length) {
			throw new NotFoundError('Recipe must have tags and instructions')
		}

		const tagIds = tags.map((t) => Number(t))

		const existingTags = await this.tagsService.getTagsByIds(tagIds)

		const tagsNotFound = existingTags.filter((t) => !tagIds.includes(t.id))

		if (tagsNotFound.length) {
			throw new NotFoundError(
				`Tags ${tagsNotFound.map((t) => t.tag)} not found`
			)
		}

		return await transaction(async (transaction) => {
			const recipe = await RecipesDBModel.create(
				{
					recipeName,
					description,
					note,
					imageUrl,
					createdBy,
				},
				{ transaction }
			)

			const recipeTags = tagIds.map((tagId) => ({
				recipeId: recipe.id,
				tagId,
			}))

			await this.tagsService.addRecipeTags(recipeTags, transaction)

			await this.instructionsService.addInstructions(
				recipe.id,
				instructions,
				transaction
			)

			return true
		})
	}

	async updateRecipe(
		id: string,
		{
			recipeName,
			description,
			note,
			imageUrl,
			tags,
			instructions,
		}: UpdateRecipeType
	) {
		await this.getRecipeById(Number(id))

		return await transaction(async (transaction) => {
			const fieldsToUpdate: Partial<UpdateRecipeType> = {}
			if (recipeName) fieldsToUpdate.recipeName = recipeName
			if (description) fieldsToUpdate.description = description
			if (note) fieldsToUpdate.note = note
			if (imageUrl) fieldsToUpdate.imageUrl = imageUrl

			await RecipesDBModel.update(
				{ ...fieldsToUpdate },
				{
					where: { id },
					transaction,
				}
			)

			if (instructions) {
				await this.instructionsService.updateInstructions(
					Number(id),
					instructions,
					transaction
				)
			}

			if (tags) {
				await this.tagsService.updateRecipeTags(
					{ recipeId: Number(id), tagIds: tags },
					transaction
				)
			}

			return true
		})
	}

	async deleteRecipe(id: number) {
		await this.getRecipeById(Number(id))

		return await transaction(async (transaction) => {
			await this.instructionsService.deleteInstructions(id, transaction)
			await this.tagsService.deleteRecipeTags(id, transaction)

			await RecipesDBModel.destroy({
				where: { id },
				transaction,
			})

			return true
		})
	}
}
