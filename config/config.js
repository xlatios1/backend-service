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
	supabase: {
		username: process.env.SUPABASE_DB_USERNAME,
		password: process.env.SUPABASE_DB_PASSWORD,
		database: process.env.SUPABASE_DB_DATABASE,
		host: process.env.SUPABASE_HOSTNAME,
		dialect: 'postgres',
		port: process.env.SUPABASE_DB_PORT,
	},
	neon: {
		url: process.env.NEON_URL,
		dialect: 'postgres',
		dialectOptions: { ssl: { require: true } },
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
