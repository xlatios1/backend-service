import { GraphQLError } from 'graphql'

class SessionTimeoutError extends GraphQLError {
	constructor(
		message = 'Your session has expired. Please log in again.',
		details = {}
	) {
		super(message, {
			extensions: {
				code: 'SESSION_EXPIRED',
				...details, // Include additional details (e.g., resource type, ID)
			},
		})
		this.name = 'SessionTimeoutError'
	}
}

export { SessionTimeoutError }
