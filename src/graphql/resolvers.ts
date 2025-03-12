import { StrawberryService } from '../strawberry/service/strawberry.service'
import { UserService } from '../users/service/users.service'
import { ForbiddenError } from 'apollo-server-errors'

const strawberryService = new StrawberryService()
const userService = new UserService()
const FORBIDDEN_ERROR_MESSAGE = 'You must login to access this service!'

export const resolvers = {
	Query: {
		getAllStrawberry: async (_parent, _args, context) => {
			const { user } = context
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			return await strawberryService.getAllStrawberry()
		},

		getStrawberryById: async (_parent, _args, context) => {
			const { user } = context
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			return await strawberryService.getAllStrawberryById(Number(user.id))
		},

		checkUserExists: async (_parent, args, context) => {
			const { user, authToken } = context
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			return await userService.checkUserExists(Number(user.id), authToken)
		},
	},

	Strawberry: {
		userId: async (parent) => {
			return await userService.getUser(Number(parent.userId))
		},
	},

	Mutation: {
		authenticate: async (_, args) => {
			return await userService.authenticate(
				args.username,
				args.password,
				args.deviceToken
			)
		},

		signup: async (_, args) => {
			return await userService.createUser(args)
		},

		signout: async (_, _args, context) => {
			const { user } = context
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			return await userService.logout(Number(user.id))
		},

		addStrawberry: async (_parent, args, context) => {
			const { user } = context
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			return await strawberryService.addStrawberryById(
				Number(args.id),
				Number(args.count),
				args.comments
			)
		},
	},
}
