import { GraphQLError } from 'graphql'
import { StrawberryService } from '../strawberry/service/strawberry.service'
import { UserService } from '../users/service/users.service'
import { UnauthorizedError } from '../errorHandlers/unauthorizedError'

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
	Query: {
		async getAllStrawberry(_parent, _args, context) {
			const { user } = context
			if (!user) throw new UnauthorizedError()

			return await new StrawberryService().getAllStrawberry()
		},

		async getStrawberryById(_parent, _args, context) {
			const { user } = context
			if (!user) throw new UnauthorizedError()

			return await new StrawberryService().getAllStrawberryById(Number(user.id))
		},

		async addStrawberry(_parent, args, context) {
			const { user } = context
			if (!user) throw new UnauthorizedError()

			return await new StrawberryService().addStrawberry(
				Number(user.id),
				Number(args.count)
			)
		},

		async checkUserExists(_parent, args, context) {
			const { user, authToken } = context
			if (!user) throw new UnauthorizedError()

			return await new UserService().checkUserExists(Number(user.id), authToken)
		},
	},
	Strawberry: {
		async userId(parent, args, context) {
			return await new UserService().getUser(Number(parent.userId))
		},
	},
	Mutation: {
		async authenticate(_, args, context, info) {
			return await new UserService().authenticate(
				args.username,
				args.password,
				args.deviceToken
			)
		},
		async signup(_, args, context) {
			return await new UserService().createUser(args)
		},
		async signout(_, args, context) {
			const { user } = context
			if (!user) throw new UnauthorizedError()

			return await new UserService().logout(Number(user.id))
		},
	},
}
