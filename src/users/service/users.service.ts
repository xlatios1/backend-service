import { AuthenticationError } from 'apollo-server-errors'
import { AuthResponse } from '../dto/auth-response.dto'
import { UserDevicesDBModel } from '../models/users-devices.model'
import { UsersDBModel } from '../models/users.model'
import bcrypt from 'bcrypt'
import { UserDataType } from '../types/users.type'
import jwt from 'jsonwebtoken'
import { NotFoundError } from '../../errorHandlers/NotFoundError'

export class UserService {
	async getUser(id: number) {
		const user = await UsersDBModel.findOne({
			where: { id },
			raw: true,
		})

		if (!user) {
			throw new NotFoundError(`User with ID ${id} not found`, { id })
		}

		return { ...user, password: undefined }
	}

	/**
	 * Authenticates the user based on input username and password.
	 * @param username The username of the user.
	 * @param password The password of the user.
	 * @returns The success status of authentication.
	 */
	async authenticate(
		username: string,
		password: string,
		deviceToken?: string
	): Promise<AuthResponse> {
		const user = await UsersDBModel.findOne({
			where: { username },
			raw: true,
		})
		if (!user) {
			throw new NotFoundError(`User with username ${username} not found`, {
				username,
			})
		}

		const passwordIsValid = bcrypt.compareSync(password, user.password)

		if (!passwordIsValid) {
			throw new AuthenticationError('Invalid Credentials')
		}

		return await this.generateAuthResponse(user, deviceToken)
	}

	async checkUserExists(userId: number, deviceToken?: string) {
		const user = await UsersDBModel.findOne({
			where: { id: userId },
			raw: true,
		})

		if (!user) return null
		return this.generateAuthResponse(user, deviceToken)
	}

	private async generateAuthResponse(user: UsersDBModel, deviceToken?: string) {
		if (!deviceToken) {
			deviceToken = this.generateToken(user)

			const res = await UserDevicesDBModel.create({
				userId: user.id,
				deviceToken,
			})
		}
		return new AuthResponse(user, deviceToken)
	}

	private generateToken(user: UsersDBModel) {
		const JWT_SECRET = process.env.JWT_SECRET
		const token = jwt.sign(
			{
				id: user.id,
				username: user.username,
			},
			JWT_SECRET
		)
		return token
	}

	async logout(userId: number): Promise<Boolean> {
		const rowsDeleted = await UserDevicesDBModel.destroy({
			where: { userId },
			logging: console.log,
		})
		if (!rowsDeleted) {
			throw new NotFoundError(`User with id '${userId}' not found`, {
				userId,
			})
		}
		return !!rowsDeleted
	}

	public async createUser(userData: UserDataType) {
		const newUser = await UsersDBModel.create(
			{
				username: userData.username,
				password: this.generateHashedPassword(userData.password),
				displayName: userData.displayName,
			},
			{ raw: true }
		)

		return await this.generateAuthResponse(newUser)
	}

	private generateHashedPassword(password: string): string {
		const salt = bcrypt.genSaltSync(10)
		return bcrypt.hashSync(password, salt)
	}
}
