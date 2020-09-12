const path = require('path')
const fs = require('fs')

export default function requireController(controllerExp: string) {
	const [controllerName, controllerAction] = controllerExp.split('@')
	const route = path.resolve(process.env.PATH_CONTROLLERS, controllerName+'.js')

	if (fs.existsSync(route)) {
		const controller = new (require(route))()

		if (controller[controllerAction]) {
			return controller[controllerAction]
		}
	}
}