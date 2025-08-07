import { NotFoundError } from '@src/errorHandlers/NotFoundError'
import { RecipesDBModel } from '@src/recipe/models/recipe.model'
import { encodeCursor } from '@src/utils/cursor'
import transaction from '@src/utils/transactions'
import { Op } from 'sequelize'
import { InstructionsDBModel } from '../models/instructions.model'
import { AddRecipeType, UpdateRecipeType } from '../types/recipe.model'

export class RecipeService {
	async getRecipes(first: number, afterId: number) {
		const recipes = await RecipesDBModel.findAll({
			where: { id: { [Op.gt]: afterId } },
			order: [['id', 'ASC']],
			limit: first,
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

	async getInstructionsById(recipeId: number) {
		const instructions = await InstructionsDBModel.findAll({
			where: { recipeId },
			order: [['order', 'ASC']],
			raw: true,
		})

		if (!instructions) {
			throw new NotFoundError(
				`Recipe instructions with ID ${recipeId} not found`,
				{
					recipeId,
				}
			)
		}

		return instructions
	}

	async addRecipe({
		recipeName,
		description,
		note,
		imageUrl,
		createdBy,
		steps,
	}: AddRecipeType) {
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

			const instructions = steps.map((step) => ({
				...step,
				recipeId: recipe.id,
			}))

			await InstructionsDBModel.bulkCreate(instructions, { transaction })

			return recipe
		})
	}

	async updateRecipe({
		id,
		recipeName,
		description,
		note,
		imageUrl,
		steps,
	}: UpdateRecipeType) {
		return await transaction(async (transaction) => {
			await RecipesDBModel.update(
				{
					recipeName,
					description,
					note,
					imageUrl,
				},
				{
					where: { id },
					transaction,
				}
			)

			await InstructionsDBModel.destroy({
				where: { recipeId: id },
				transaction,
			})

			const instructions = steps.map((step) => ({
				...step,
				recipeId: id,
			}))

			await InstructionsDBModel.bulkCreate(instructions, { transaction })

			return true
		})
	}

	async deleteRecipe(id: number) {
		return await transaction(async (transaction) => {
			await InstructionsDBModel.destroy({
				where: { recipeId: id },
				transaction,
			})

			await RecipesDBModel.destroy({
				where: { id },
				transaction,
			})

			return true
		})
	}
}
