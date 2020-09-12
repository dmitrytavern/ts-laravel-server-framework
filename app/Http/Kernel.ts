export default class HttpKernel implements IHttpKernel {

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