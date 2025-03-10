import '../auth/passport-handler'
import { AuthenticationError } from 'apollo-server-errors'

import passport from 'passport'

// Apollo Context with JWT Validation
export const validateToken = (req) => {
	return new Promise((resolve, reject) => {
		passport.authenticate('jwt', { session: false }, (err, user, info) => {
			if (err || !user) {
				return reject(new AuthenticationError('Invalid or missing token'))
			}
			resolve(user)
		})(req)
	})
}
