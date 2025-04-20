import { ApolloError } from 'apollo-server-errors'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import dbConfig from '../config/config'
import { models } from './models'

const dbConfigs = dbConfig[process.env.NODE_ENV]

let sequelize = null
export const DB = {
	init: async () => {
		if (process.env.NODE_ENV === 'neon') {
			sequelize = new Sequelize(dbConfigs.url, {
				models,
				logging: false,
				timezone: '+08:00',
				dialectOptions: dbConfigs.dialectOptions,
			})
		} else {
			const dbOptions: SequelizeOptions = {
				host: dbConfigs.host,
				dialect: 'postgres',
				pool: {
					min: 0,
					max: 5,
					acquire: 30000,
					idle: 10000,
				},
				models,
				logging: false,
				timezone: '+08:00',
			}

			if (dbConfigs.port) {
				dbOptions.port = Number(dbConfigs.port)
			}

			sequelize = new Sequelize(
				dbConfigs.database,
				dbConfigs.username,
				dbConfigs.password,
				dbOptions
			)
		}

		// Check the connection
		try {
			await sequelize.authenticate()
			console.log(
				`Successfully connected to the database: '${
					dbConfigs.database || 'neon'
				}' at '${dbConfigs.host || 'neon'}:${dbConfigs.port || ''}'`
			)
		} catch (error) {
			console.error('Unable to connect to the database:', error)
		}
	},
	getInstance: (): Sequelize => {
		if (sequelize) {
			return sequelize
		}
		throw new ApolloError('Database not initialised.', 'INTERNAL_SERVER_ERROR')
	},
}
