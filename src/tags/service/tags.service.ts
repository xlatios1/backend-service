import transaction from '@src/utils/transactions'
import { Op, Transaction } from 'sequelize'
import { RecipeTagsDBModel } from '../../recipe/models/recipeTags.model'
import { TagsDBModel } from '../models/tags.model'
import {
	AddRecipeTagType,
	AddTagType,
	UpdateRecipeTagType,
	UpdateTagType,
} from '../types/tags.type'

export class TagsService {
	async getAllTags() {
		return await TagsDBModel.findAll({ order: [['order', 'asc']], raw: true })
	}

	async getTagsByIds(ids: number[]) {
		return await TagsDBModel.findAll({
			where: { id: { [Op.in]: ids } },
			order: [['order', 'asc']],
			raw: true,
		})
	}

	async getTagsByRecipeId(recipeId: number) {
		const tags = await RecipeTagsDBModel.findAll({
			attributes: ['tagId'],
			where: { recipeId },
			raw: true,
		})

		return await TagsDBModel.findAll({
			where: {
				id: { [Op.in]: tags.map((tag) => tag.tagId) },
			},
			order: [['order', 'asc']],
			raw: true,
		})
	}

	async addTag(tag: AddTagType) {
		const existingTag = await TagsDBModel.findAll({
			where: { [Op.or]: [{ tag: tag.tag }, { order: tag.order }] },
			raw: true,
		})

		if (existingTag.length) {
			throw new Error(`Tags already exists or order is invalid!`)
		}

		await TagsDBModel.create(
			{ ...tag },
			{
				order: [['order', 'asc']],
				raw: true,
			}
		)

		return true
	}

	async addRecipeTags(data: AddRecipeTagType[], t?: Transaction) {
		return await RecipeTagsDBModel.bulkCreate(data, { transaction: t })
	}

	async updateRecipeTags(data: UpdateRecipeTagType, t: Transaction) {
		const currentTags = await RecipeTagsDBModel.findAll({
			where: { recipeId: data.recipeId },
			attributes: ['tagId'],
			raw: true,
		})
		const currentTagIds = currentTags.map((t) => t.tagId)

		const toAdd = data.tagIds.filter((id) => !currentTagIds.includes(id))
		const toRemove = currentTagIds.filter((id) => !data.tagIds.includes(id))

		if (toRemove.length) {
			await RecipeTagsDBModel.destroy({
				where: { recipeId: data.recipeId, tagId: { [Op.in]: toRemove } },
				transaction: t,
			})
		}

		if (toAdd.length) {
			await RecipeTagsDBModel.bulkCreate(
				toAdd.map((tagId) => ({ recipeId: data.recipeId, tagId })),
				{ transaction: t }
			)
		}

		return true
	}

	async deleteRecipeTags(recipeId: number, transaction?: Transaction) {
		return await RecipeTagsDBModel.destroy({
			where: { recipeId },
			transaction,
		})
	}

	async updateTags(updates: UpdateTagType[]) {
		return await transaction(async (t) => {
			await Promise.all(
				updates.map((u) => {
					const fieldsToUpdate: Partial<{ tag: string; order: number }> = {}
					if (u.tag !== undefined) fieldsToUpdate.tag = u.tag
					if (u.order !== undefined) fieldsToUpdate.order = u.order

					return TagsDBModel.update(fieldsToUpdate, {
						where: { id: u.id },
						transaction: t,
					})
				})
			)

			return true
		})
	}

	async safeDeleteTag(id: number) {
		const tagged = await RecipeTagsDBModel.findAll({
			where: { tagId: id },
			raw: true,
		})

		if (tagged.length > 0) {
			throw new Error(`Tag is used by recipes ${tagged.map((t) => t.recipeId)}`)
		}

		await TagsDBModel.destroy({
			where: { id },
		})

		return true
	}
}
