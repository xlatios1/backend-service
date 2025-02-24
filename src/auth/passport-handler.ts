import passport from 'passport'
import passportJwt from 'passport-jwt'
import { NotFoundError, UnauthorizedError } from 'routing-controllers'
import { UserService } from '../users/service/users.service'

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
					throw new UnauthorizedError(invalidTokenMessage)
				}

				const userId = decodedToken?.id
				const username = decodedToken?.username
				if (!userId || !username) {
					throw new UnauthorizedError(invalidTokenMessage)
				}

				new UserService().getUser(Number(userId))

				const userContext = {
					id: userId,
					username,
				}
				return done(null, userContext)
			} catch (error) {
				if (error instanceof NotFoundError) {
					return done(new UnauthorizedError(invalidTokenMessage), false)
				}
				return done(error, false)
			}
		}
	)
)
