import { NotFoundError, UnauthorizedError } from 'routing-controllers'
import { ApolloError } from 'apollo-server-errors'
import { AuthResponse } from '../dto/auth-response.dto'
import { UserDevicesDBModel } from '../models/users-devices.model'
import { UsersDBModel } from '../models/users.model'
import bcrypt from 'bcrypt'
import { UserDataType } from '../types/users.type'
import jwt from 'jsonwebtoken'

export class UserService {
	async getUser(id: number) {
		try {
			const user = await UsersDBModel.findOne({
				where: { id },
				raw: true,
			})
			if (!user) {
				throw new NotFoundError('User does not exist!')
			}
			return { ...user, password: undefined }
		} catch (e) {
			const errorMessage = `An error occurred while getting the user. Error: ${
				e.message || e
			}`

			if (e instanceof NotFoundError) {
				throw new ApolloError(errorMessage, 'USER_NOT_FOUND')
			}

			// For any other error, wrap it in a generic ApolloError
			throw new ApolloError(errorMessage, 'INTERNAL_SERVER_ERROR')
		}
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
		try {
			const user = await UsersDBModel.findOne({
				where: { username },
				raw: true,
			})
			if (!user) {
				throw new UnauthorizedError('Invalid Credentials')
			}

			const passwordIsValid = bcrypt.compareSync(password, user.password)

			if (!passwordIsValid) {
				throw new UnauthorizedError('Invalid Credentials')
			}

			return await this.generateAuthResponse(user, deviceToken)
		} catch (error) {
			throw new Error(
				`An error occurred while getting the user. Error: ${error}`
			)
		}
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
		try {
			if (!deviceToken) {
				deviceToken = this.generateToken(user)

				const res = await UserDevicesDBModel.create({
					userId: user.id,
					deviceToken,
				})

				if (!res) {
					throw new Error('Failed to create user devices')
				}
			}
		} catch (error) {
			throw new Error(
				`An error occurred while creating user devices. Error: ${error}`
			)
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
		try {
			const rowsDeleted = await UserDevicesDBModel.destroy({
				where: { userId },
				logging: console.log,
			})
			if (!rowsDeleted) {
				throw new NotFoundError('User not found')
			}
			return !!rowsDeleted
		} catch (error) {
			throw new Error(
				`An error occurred while logging out the user. Error: ${error}`
			)
		}
	}

	public async createUser(userData: UserDataType) {
		try {
			const newUser = await UsersDBModel.create(
				{
					username: userData.username,
					password: this.generateHashedPassword(userData.password),
					displayName: userData.displayName,
				},
				{ raw: true }
			)

			return await this.generateAuthResponse(newUser)
		} catch (err) {
			throw new Error(`Unable to create user. Error: ${err}`)
		}
	}

	private generateHashedPassword(password: string): string {
		const salt = bcrypt.genSaltSync(10)
		return bcrypt.hashSync(password, salt)
	}
}
