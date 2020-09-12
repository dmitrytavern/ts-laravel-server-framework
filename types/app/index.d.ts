interface RouteMethods {
	view(string: string): any
	middleware(...string): any
}

interface IHttpKernel {
	middleware: Array<string>
	routeMiddleware: {
		[key: string]: string
	}
}

declare class Middleware {
	handle(req, res, next): any
}