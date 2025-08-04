import { StrawberryType } from '@src/strawberry/types/strawberry.type'

export interface UsersType {
	id: number
	username: string
	password: string
	displayName: string
	imageUrl?: string
	readonly createdAt?: Date
	readonly updatedAt?: Date
	strawberries?: StrawberryType[]
}

export interface UserDataType {
	username: string
	password: string
	displayName: string
}
