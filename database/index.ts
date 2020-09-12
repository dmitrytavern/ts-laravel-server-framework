const Sequelize = require('sequelize')

const env = process.env

const sequelize = new Sequelize.Sequelize(
	env.DB_DATABASE,
	env.DB_USERNAME,
	env.DB_PASSWORD, {
	host: env.DB_HOST,
	port: env.DB_PORT,
	dialect: env.DB_CONNECTION,
	logging: false
});


export default sequelize