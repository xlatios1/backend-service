import '@src/auth/passport-handler'

import { NotFoundError } from '@errors/NotFoundError'
import passport from 'passport'

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
