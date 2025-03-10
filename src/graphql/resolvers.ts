import { withErrorHandling } from '../errorHandlers/errorWrapper'
import { StrawberryService } from '../strawberry/service/strawberry.service'
import { UserService } from '../users/service/users.service'
import { AuthenticationError } from 'apollo-server-errors'

const strawberryService = new StrawberryService()
const userService = new UserService()

export const resolvers = {
	Query: {
		getAllStrawberry: withErrorHandling(async (_parent, _args, context) => {
			const { user } = context
			if (!user)
				throw new AuthenticationError('You must login to access this service!')

			return await strawberryService.getAllStrawberry()
		}),

		getStrawberryById: withErrorHandling(async (_parent, _args, context) => {
			const { user } = context
			if (!user)
				throw new AuthenticationError('You must login to access this service!')

			return await strawberryService.getAllStrawberryById(Number(user.id))
		}),

		checkUserExists: withErrorHandling(async (_parent, args, context) => {
			const { user, authToken } = context
			if (!user)
				throw new AuthenticationError('You must login to access this service!')

			return await userService.checkUserExists(Number(user.id), authToken)
		}),
	},

	Strawberry: {
		userId: withErrorHandling(async (parent) => {
			return await userService.getUser(Number(parent.userId))
		}),
	},

	Mutation: {
		authenticate: withErrorHandling(async (_, args) => {
			return await userService.authenticate(
				args.username,
				args.password,
				args.deviceToken
			)
		}),

		signup: withErrorHandling(async (_, args) => {
			return await userService.createUser(args)
		}),

		signout: withErrorHandling(async (_, _args, context) => {
			const { user } = context
			if (!user)
				throw new AuthenticationError('You must login to access this service!')

			return await userService.logout(Number(user.id))
		}),

		addStrawberry: withErrorHandling(async (_parent, args, context) => {
			const { user } = context
			if (!user)
				throw new AuthenticationError('You must login to access this service!')

			return await strawberryService.addStrawberryById(
				Number(args.id),
				Number(args.count),
				args.comments
			)
		}),
	},
}
