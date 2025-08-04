import { ApolloError } from 'apollo-server-errors'

export const withErrorHandling = (fn: (...args: any[]) => Promise<any>) => {
	return async (...args: any[]) => {
		try {
			return await fn(...args)
		} catch (e) {
			if (e instanceof ApolloError) {
				throw e
			}

			throw new ApolloError(
				e?.message || 'An unexpected error occurred.',
				'INTERNAL_SERVER_ERROR'
			)
		}
	}
}
