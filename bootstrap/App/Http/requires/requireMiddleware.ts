const path = require('path')

import Kernel from "@app/Http/Kernel";

export default function requireMiddleware(kernel: Kernel) {
	const middleware: any = {}
	for (const middlewarePath of kernel.middleware) {
		const basePath = path.resolve(middlewarePath)
		const baseName = path.basename(basePath)

		middleware[baseName] = require(basePath).default
	}

	return middleware
}