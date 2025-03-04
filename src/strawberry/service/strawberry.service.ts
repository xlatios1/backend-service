import { StrawberryDBModel } from '../models/strawberry.model'

export class StrawberryService {
	async getAllStrawberry() {
		try {
			return await StrawberryDBModel.findAll({
				raw: true,
			})
		} catch (e) {
			throw new Error(
				`An error occurred while getting all of strawberry data. Error: ${e}`
			)
		}
	}

	async getAllStrawberryById(userId: number) {
		try {
			return await StrawberryDBModel.findAll({
				where: { userId },
				raw: true,
			})
		} catch (e) {
			throw new Error(
				`An error occurred while getting all of strawberry data from user '${userId}'. Error: ${e}`
			)
		}
	}

	async getStrawberryCountById(userId: number) {
		try {
			return (
				await StrawberryDBModel.findAll({
					where: { userId },
					raw: true,
				})
			).reduce((acc, cur) => acc + cur.count, 0)
		} catch (e) {
			throw new Error(
				`An error occurred while getting count of strawberry data from user '${userId}'. Error: ${e}`
			)
		}
	}

	async addStrawberryById(userId: number, count: number, comments?: string) {
		try {
			const res = (
				await StrawberryDBModel.create({
					userId,
					count,
					comments,
				})
			).get({ plain: true })

			return await this.getAllStrawberry()
		} catch (e) {
			throw new Error(
				`An error occurred while adding a new strawberry for ${userId}. Error: ${e}`
			)
		}
	}
}
