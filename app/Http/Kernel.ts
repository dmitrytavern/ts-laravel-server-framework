export default class Kernel implements HttpKernel.Class {

	/*
	*  Middleware global
	* */

	public readonly middleware: HttpKernel.KernelMiddleware = [
		'app/Http/Middleware/Localization'
	]



	/*
	*   Middleware route
	* */

	public readonly middlewareRoute: HttpKernel.KernelMiddlewareRoute = {
		'auth': 'app/Http/Middleware/Authenticate'
	}



	/*
	*   Middleware group
	* */

	public readonly middlewareGroup: HttpKernel.KernelMiddlewareGroup = {

	}
}