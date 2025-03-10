import { GraphQLError } from 'graphql'

class NotFoundError extends GraphQLError {
	constructor(message = 'Resource not found', details = {}) {
		super(message, {
			extensions: {
				code: 'NOT_FOUND',
				...details, // Include additional details (e.g., resource type, ID)
			},
		})
		this.name = 'NotFoundError'
	}
}

export { NotFoundError }
