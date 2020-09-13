const path = require('path')

import Kernel from "@app/Http/Kernel";
const kernel = new Kernel()


export default function requireMiddleware() {
	const middleware: any = {}
	for (const middlewarePath of kernel.middleware) {
		const basePath = path.resolve(middlewarePath)
		const baseName = path.basename(basePath)

		middleware[baseName] = require(basePath).default
	}

	return middleware
}