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