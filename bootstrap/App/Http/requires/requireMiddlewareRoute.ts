
const path = require('path')

import Kernel from "@app/Http/Kernel";


export default function requireMiddlewareRoute(kernel: Kernel) {
	const middlewareRoute: any = {}
	for (const [middlewareName, middlewarePath] of Object.entries(kernel.middlewareRoute)) {
		const basePath = path.resolve(<string>middlewarePath)

		middlewareRoute[middlewareName] = require(basePath).default
	}

	return middlewareRoute
}