import { ForbiddenError } from '@errors/ForbiddenError'
import { FORBIDDEN_ERROR_MESSAGE } from '@src/constants/constants'
import { StrawberryService } from '@src/strawberry/service/strawberry.service'
import { UserService } from '@src/users/service/users.service'

const strawberryService = new StrawberryService()
const userService = new UserService()

export const strawberryResolvers = {
	Query: {
		getAllStrawberry: async (_parent, _args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			return strawberryService.getAllStrawberry()
		},

		getStrawberryById: async (_parent, _args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			return strawberryService.getAllStrawberryById(Number(user.id))
		},
	},

	Strawberry: {
		userId: async (parent, _args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			// assertResourceOwner({
			// 	currentUserId: Number(user.id),
			// 	resourceOwnerId: Number(parent.userId),
			// })

			return userService.getUser(Number(parent.userId))
		},
	},

	Mutation: {
		addStrawberry: async (_parent, args, { user }) => {
			if (!user) throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE)

			return strawberryService.addStrawberryById(
				Number(args.id),
				Number(args.count),
				args.comments
			)
		},
	},
}
