import passport from 'passport'
import passportJwt from 'passport-jwt'
import { UserService } from '../users/service/users.service'
import { SessionTimeoutError } from '../errorHandlers/SessionTimeoutError'

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt
const invalidTokenMessage = 'the token is not valid or expired'

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		},
		async function (decodedToken, done) {
			try {
				// TODO: validate the token structure in run-time
				if (!decodedToken) {
					throw new SessionTimeoutError()
				}

				const userId = decodedToken.id
				const username = decodedToken.username
				if (!userId || !username) {
					throw new SessionTimeoutError()
				}

				new UserService().getUser(Number(userId))

				const userContext = {
					id: userId,
					username,
				}
				return done(null, userContext)
			} catch (error) {
				return done(new SessionTimeoutError(), false)
			}
		}
	)
)
