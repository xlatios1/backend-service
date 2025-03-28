import dotenv from 'dotenv'

dotenv.config()

export default {
	development: {
		username: process.env.DEVELOPMENT_DB_USERNAME,
		password: process.env.DEVELOPMENT_DB_PASSWORD,
		database: process.env.DEVELOPMENT_DB_DATABASE,
		host: process.env.DEVELOPMENT_HOSTNAME,
		dialect: 'postgres',
		port: process.env.DEVELOPMENT_DB_PORT,
	},
	production: {
		username: process.env.PROD_DB_USERNAME,
		password: process.env.PROD_DB_PASSWORD,
		database: process.env.PROD_DB_DATABASE,
		host: process.env.PROD_HOSTNAME,
		dialect: 'postgres',
		port: process.env.PROD_DB_PORT,
	},
}
