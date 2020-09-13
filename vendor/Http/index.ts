import requireControllers from "@vendor/Http/requires/requireController";
import requireMiddleware from "@vendor/Http/requires/requireMiddleware";
import requireRouteMiddleware from "@vendor/Http/requires/requireRouteMiddleware";

interface IHttp {
	getControllerAction(exp: string): RouterFunction

	getGlobalMiddlewareActions(): RouterFunction[]

	getMiddlewareAction(middlewareName: string): RouterFunction

	getRouteMiddlewareAction(middleware: string | string[]): RouterFunction | RouterFunction[]
}

interface IHttpMiddleware {
	[key: string]: {
		new (): Middleware
	}
}

interface IHttpController {
	[key: string]: {
		new (): Controller
	}
}


export default class Http implements IHttp {

	private readonly controllers: IHttpController = requireControllers()

	private readonly middleware: IHttpMiddleware = requireMiddleware()

	private readonly routeMiddleware: IHttpMiddleware = requireRouteMiddleware()



	/*
	*   Controllers
	* */

	getControllerAction(exp: string): RouterFunction {
		const [controllerName, controllerAction] = exp.split('@')

		if (!controllerName || !controllerAction) throw new Error(`[HTTP]: Invalid exp: ${exp}`)


		if (this.controllers.hasOwnProperty(controllerName)) {
			const controller = new (this.controllers[controllerName])()

			if (controller[controllerAction]) {

				return controller[controllerAction].bind(controller)

			} else {
				throw new Error('[HTTP: Controller action not found]')
			}

		} else {
			throw new Error('[HTTP]: Controller not found')
		}
	}



	/*
	*   Middleware
	* */

	getGlobalMiddlewareActions(): RouterFunction[] {
		const arr = []
		for (const [middlewareName, middlewareClass] of Object.entries(this.middleware)) {
			const middleware = new middlewareClass()
			arr.push(middleware.handle)
		}
		return arr
	}

	getMiddlewareAction(middlewareName: string): RouterFunction {
		const Middleware = this.routeMiddleware[middlewareName]

		if (Middleware) {
			const middleware = new Middleware()

			if (middleware.handle) {
				return middleware.handle.bind(middleware)
			} else {
				throw new Error(`[HTTP]: Middleware '${middlewareName}' have not handle function`)
			}
		}
		throw new Error(`[HTTP]: Middleware '${middlewareName}' not found `)
	}

	getRouteMiddlewareAction(middleware: string | string[]): RouterFunction | RouterFunction[] {
		if (typeof middleware === 'string') {
			return this.getMiddlewareAction(middleware)
		} else {
			const arr = []
			for (const middlewareName of middleware) {
				arr.push(this.getMiddlewareAction(middlewareName))
			}
			return arr
		}
	}
}