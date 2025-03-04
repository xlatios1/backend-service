import { UsersType } from '../../users/types/users.type'

export interface StrawberryType {
	id: number
	count: number
	userId: number
	comments?: string
	readonly createdAt: Date
	readonly updatedAt: Date
	users?: UsersType
}
