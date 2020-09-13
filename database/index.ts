const Sequelize = require('sequelize')

const env = process.env

export default new Sequelize.Sequelize(
	env.DB_DATABASE,
	env.DB_USERNAME,
	env.DB_PASSWORD, {
	host: env.DB_HOST,
	port: env.DB_PORT,
	dialect: env.DB_CONNECTION,
	logging: false
})