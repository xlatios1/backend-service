import { GraphQLError } from 'graphql'

class ForbiddenError extends GraphQLError {
	constructor(message = 'Forbidden Access', details = {}) {
		super(message, {
			extensions: {
				code: 'FORBIDDEN',
				...details, // Include additional details (e.g., resource type, ID)
			},
		})
		this.name = 'ForbiddenError'
	}
}

export { ForbiddenError }
