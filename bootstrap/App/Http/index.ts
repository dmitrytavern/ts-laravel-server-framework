import {IHttpController, IHttpMiddleware} from "./types";
import requireControllers from "./requires/requireController";
import requireMiddleware from "./requires/requireMiddleware";
import requireMiddlewareRoute from "./requires/requireMiddlewareRoute";
import Kernel from "@app/Http/Kernel";

const kernel = new Kernel()

export interface IHttp {
	getControllerMethod(exp: string): RouterFunction

	getMiddleware(...middleware: string[]): RouterFunction[]
	getMiddlewareGlobal(): RouterFunction[]
}

export default class Http implements IHttp {
	private readonly controllers: IHttpController = requireControllers()

	private readonly middlewareGlobal: IHttpMiddleware = requireMiddleware(kernel)

	private readonly middlewareRoute: IHttpMiddleware = requireMiddlewareRoute(kernel)




	public getControllerMethod(exp: string): RouterFunction {
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


	public getMiddleware(...middleware: string[]): RouterFunction[] {
		const arr = []
		for (const middlewareName of middleware) {
			arr.push(
				this._getMiddleware(middlewareName)
			)
		}
		return arr
	}

	public getMiddlewareGlobal(): RouterFunction[] {
		const arr = []
		for (const [middlewareName, middlewareClass] of Object.entries(this.middlewareGlobal)) {
			const middleware = new middlewareClass()
			arr.push(middleware.handle.bind(middleware))
		}
		return arr
	}

	private _getMiddleware(middlewareName: string): RouterFunction {
		const Middleware = this.middlewareRoute[middlewareName]

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
}