import { StrawberryDBModel } from '@src/strawberry/models/strawberry.model'

export class StrawberryService {
	async getAllStrawberry() {
		return await StrawberryDBModel.findAll({
			raw: true,
			order: [['createdAt', 'DESC']],
		})
	}

	async getAllStrawberryById(userId: number) {
		return await StrawberryDBModel.findAll({
			where: { userId },
			raw: true,
		})
	}

	async getStrawberryCountById(userId: number) {
		return (
			await StrawberryDBModel.findAll({
				where: { userId },
				raw: true,
			})
		).reduce((acc, cur) => acc + cur.count, 0)
	}

	async addStrawberryById(userId: number, count: number, comments?: string) {
		await StrawberryDBModel.create({
			userId,
			count,
			comments,
		})

		return await this.getAllStrawberry()
	}
}
