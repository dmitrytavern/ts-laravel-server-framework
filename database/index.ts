import * as DB from 'sequelize'

const env = process.env

export const Sequelize = DB

export default new DB.Sequelize(
	<string>env.DB_DATABASE,
	<string>env.DB_USERNAME,
	env.DB_PASSWORD, {
	host: env.DB_HOST,
		// @ts-ignore
	port: env.DB_PORT,
		// @ts-ignore
	dialect: env.DB_CONNECTION,
	logging: false
})