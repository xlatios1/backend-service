import { FORBIDDEN_ERROR_MESSAGE } from '@src/constants/constants'
import { ForbiddenError } from '@src/errorHandlers/ForbiddenError'
import { UserService } from '@src/users/service/users.service'

const userService = new UserService()

export const userResolvers = {
	Query: {
		checkUserExists: async (_parent, args, { user, authToken }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			return userService.checkUserExists(Number(user.id), authToken)
		},
	},

	Mutation: {
		authenticate: async (_, args) => {
			return userService.authenticate(
				args.username,
				args.password,
				args.deviceToken
			)
		},

		signup: async (_, args) => {
			return userService.createUser(args)
		},

		signout: async (_, _args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			return userService.logout(Number(user.id))
		},
	},
}
