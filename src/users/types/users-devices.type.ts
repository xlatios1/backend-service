export interface UserDeviceType {
	readonly id?: number
	userId: number
	deviceToken: string
	readonly createdAt?: Date
	readonly updatedAt?: Date
}
