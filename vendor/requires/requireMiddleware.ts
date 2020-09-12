const path = require('path')

export default function requireMiddleware(...middlewareNames: Array<string>) {
	const _class: IKernel = this

	const arr = []
	for (let middlewareName of middlewareNames) {
		if (_class.routeMiddleware.hasOwnProperty(middlewareName)) {
			const route = path.resolve(_class.routeMiddleware[middlewareName])

			const middleware: Middleware = new (require(route))()

			arr.push(middleware.handle)
		}
	}
	return arr
}