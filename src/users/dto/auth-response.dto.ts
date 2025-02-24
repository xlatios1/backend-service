import { IsNumber, IsOptional, IsString } from 'class-validator'
import { UsersDBModel } from '../models/users.model'

export class AuthResponse {
	constructor(user: UsersDBModel, token?: string) {
		this.username = user.username
		this.displayName = user.displayName
		this.imageUrl = user.imageUrl
		this.deviceToken = token
	}

	@IsNumber() private readonly username: String
	@IsString() private readonly displayName: String
	@IsString() private readonly imageUrl: String
	@IsString() @IsOptional() private readonly deviceToken: string
}
