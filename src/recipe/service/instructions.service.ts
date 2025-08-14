import { NotFoundError } from '@src/errorHandlers/NotFoundError'
import { Transaction } from 'sequelize'
import { InstructionsDBModel } from '../models/instructions.model'
import { AddInstructionType } from '../types/instructions.type'

export class InstructionsService {
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

	async addInstructions(
		recipeId: number,
		steps: AddInstructionType[],
		transaction?: Transaction
	) {
		const instructions = steps.map((step) => ({
			...step,
			recipeId,
		}))

		return await InstructionsDBModel.bulkCreate(instructions, {
			transaction,
		})
	}

	async deleteInstructions(recipeId: number, transaction?: Transaction) {
		return await InstructionsDBModel.destroy({
			where: { recipeId },
			transaction,
		})
	}

	async updateInstructions(
		recipeId: number,
		instructions: AddInstructionType[],
		transaction?: Transaction
	) {
		await this.deleteInstructions(recipeId, transaction)
		return this.addInstructions(recipeId, instructions, transaction)
	}
}
