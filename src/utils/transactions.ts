import { DB } from '@src/database'
import Transaction from 'sequelize/types/transaction'

export default async function transaction<T>(
	callback: (t: Transaction) => Promise<T>
): Promise<T> {
	const t = await DB.getInstance().transaction()

	try {
		const result = await callback(t)
		await t.commit()

		return result
	} catch (error) {
		await t.rollback()
		throw error
	}
}
