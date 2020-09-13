import Express from "express";

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
		export interface KernelRouteMiddleware {
			[key: string]: string
		}

		export interface Class {
			middleware: KernelMiddleware
			routeMiddleware: KernelRouteMiddleware
		}
	}
}