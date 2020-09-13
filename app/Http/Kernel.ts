export default class Kernel implements HttpKernel.Class {

	/*
	*   Global middleware
	* */

	public readonly middleware: HttpKernel.KernelMiddleware = [
		'app/Http/Middleware/Localization'
	]



	/*
	*   Route middleware
	* */

	public readonly routeMiddleware: HttpKernel.KernelRouteMiddleware = {
		'auth': 'app/Http/Middleware/Authenticate'
	}
}