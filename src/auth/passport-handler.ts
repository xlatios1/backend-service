import passport from 'passport'
import passportJwt from 'passport-jwt'
import { UserService } from '../users/service/users.service'
import { ApolloError, AuthenticationError } from 'apollo-server-errors'

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
					throw new AuthenticationError(invalidTokenMessage)
				}

				const userId = decodedToken?.id
				const username = decodedToken?.username
				if (!userId || !username) {
					throw new AuthenticationError(invalidTokenMessage)
				}

				new UserService().getUser(Number(userId))

				const userContext = {
					id: userId,
					username,
				}
				return done(null, userContext)
			} catch (error) {
				if (error instanceof ApolloError) {
					return done(new AuthenticationError(invalidTokenMessage), false)
				}
				return done(error, false)
			}
		}
	)
)
