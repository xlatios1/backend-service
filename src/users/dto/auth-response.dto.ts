import { UsersDBModel } from '@src/users/models/users.model'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class AuthResponse {
	constructor(user: UsersDBModel, token?: string) {
		this.id = user.id
		this.username = user.username
		this.displayName = user.displayName
		this.imageUrl = user.imageUrl
		this.deviceToken = token
	}

	@IsNumber() private readonly id: number
	@IsString() private readonly username: String
	@IsString() private readonly displayName: String
	@IsString() private readonly imageUrl: String
	@IsString() @IsOptional() private readonly deviceToken: string
}
