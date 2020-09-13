export default class Kernel implements HttpKernel {

	/*
	*   Global middleware
	* */

	public readonly middleware: Array<string> = [
		'app/Http/Middleware/Localization'
	]



	/*
	*   Route middleware
	* */

	public readonly routeMiddleware: any = {
		'auth': 'app/Http/Middleware/Authenticate'
	}
}