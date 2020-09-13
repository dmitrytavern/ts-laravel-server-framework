import './vendor/aliases'
import app from '@vendor/express'
import sequelize from '@database/index'

async function assertDatabaseConnectionOk() {
	try {
		await sequelize.authenticate();
		console.log('[APP]: Database connection OK!');
	} catch (error) {
		console.log('[APP]: Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function init() {
	await assertDatabaseConnectionOk();
	app.listen(process.env.SERVER_PORT);
}

init().then(r => {
	console.log(`[APP]: App is work. URL http://localhost:${process.env.SERVER_PORT}`)
});