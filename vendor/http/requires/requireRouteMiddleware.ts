const path = require('path')

import Kernel from "@app/Http/Kernel";
const kernel = new Kernel()


export default function requireRouteMiddleware() {
	const routeMiddleware: any = {}
	for (const [middlewareName, middlewarePath] of Object.entries(kernel.routeMiddleware)) {
		const basePath = path.resolve(<string>middlewarePath)

		routeMiddleware[middlewareName] = require(basePath).default
	}

	return routeMiddleware
}