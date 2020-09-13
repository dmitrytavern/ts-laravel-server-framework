const path  = require('path')
const glob  = require("glob")

const extFile = '.ts'
const pathController = <string>process.env["PATH_CONTROLLERS"]
const route = path.join(pathController, '**/[a-z| A-Z]*Controller'+extFile)

export default function requireControllers() {
	const controllers: any = {}
	const files = glob.sync(route, {})

	for (const file of files) {
		const fullPath = path.resolve(file)
		const basePath = file
			.replace(pathController, '')
			.replace(/^\//, '')
			.replace(/\/$/, '')
			.replace(extFile, '')
			.trim()

		const Controller = require(fullPath).default

		if (typeof Controller === 'function') {

			controllers[basePath] = Controller

		} else {
			console.error(`[HTTP]: Invalid controller type. File ${fullPath}`)
		}
	}

	return controllers
}