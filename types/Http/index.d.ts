import Express from "express";


declare global {
	type RouterFunction = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => void

	class Middleware {
		[key: string]: any

		handle: RouterFunction
	}

	class Controller {
		[key: string]: any
	}



	interface HttpKernel {
		middleware: Array<string>
		routeMiddleware: {
			[key: string]: string
		}
	}

	interface Router extends Express.Router {}

	interface RouterActions {
		view(str: string): RouterFunction,
		middleware(str: string | string[]): RouterFunction | RouterFunction[]
	}
}