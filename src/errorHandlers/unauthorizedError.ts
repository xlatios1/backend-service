import { GraphQLError } from 'graphql'

class UnauthorizedError extends GraphQLError {
	constructor(message = 'You must be logged in to access this resource') {
		super(message, {
			extensions: {
				code: 'UNAUTHENTICATED',
			},
		})
		this.name = 'UnauthorizedError'
	}
}

export { UnauthorizedError }
