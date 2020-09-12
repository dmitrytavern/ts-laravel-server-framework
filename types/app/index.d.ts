import { NextFunction } from "express-serve-static-core";


declare global {
	class Middleware {
		handle(req: Express.Request, res: Express.Response, next: NextFunction): any
	}

	interface IKernel {
		middleware: Array<string>
		routeMiddleware: {
			[key: string]: string
		}
	}
}
