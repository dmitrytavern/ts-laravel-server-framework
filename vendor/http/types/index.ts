export interface IHttp {
	getControllerAction(exp: string): RouterFunction

	getGlobalMiddleware(): RouterFunction[]

	getMiddleware(middleware: string | string[]): RouterFunction | RouterFunction[]
}

export interface IHttpMiddleware {
	[key: string]: {
		new (): Middleware
	}
}

export interface IHttpController {
	[key: string]: {
		new (): Controller
	}
}