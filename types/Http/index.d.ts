import { IApp } from "../../bootstrap/App";

declare global {
	namespace NodeJS {
		interface Process {
			app: IApp
		}
	}
}

declare global {
	class Middleware {
		[key: string]: any

		handle: RouterFunction
	}

	class Controller {
		[key: string]: any
	}

	namespace HttpKernel {
		export type KernelMiddleware = Array<string>
		export interface KernelMiddlewareRoute {
			[key: string]: string
		}
		export interface KernelMiddlewareGroup {
			[key: string]: string[]
		}

		export interface Class {
			middleware: KernelMiddleware
			middlewareRoute: KernelMiddlewareRoute
			middlewareGroup: KernelMiddlewareGroup
		}
	}
}