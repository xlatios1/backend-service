import '../auth/passport-handler'

import passport from 'passport'
import { NotFoundError } from '../errorHandlers/NotFoundError'

// Apollo Context with JWT Validation
export const validateToken = (req) => {
	return new Promise((resolve, reject) => {
		passport.authenticate('jwt', { session: false }, (err, user, info) => {
			if (err) {
				return reject(err)
			}
			if (!user) {
				throw new NotFoundError('User not found!')
			}
			resolve(user)
		})(req)
	})
}
