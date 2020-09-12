const path = require('path')

export default function requireMiddleware(...middlewareNames) {
	const arr = []
	for (let middlewareName of middlewareNames) {
		if (this.routeMiddleware.hasOwnProperty(middlewareName)) {
			const route = path.resolve(this.routeMiddleware[middlewareName])

			const middleware: Middleware = new (require(route))()

			arr.push(middleware.handle)
		}
	}
	return arr
}