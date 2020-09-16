import Http from "../Http";

const http = new Http()

export interface IRouter {
	middleware(...middleware: string[]): RouterFunction[]
	view(exp: string): RouterFunction
}



export default class Router implements IRouter {

	view(exp: string): RouterFunction {
		return http.getControllerMethod(exp)
	}

	middleware(...middleware: string[]): RouterFunction[] {
		return http.getMiddleware(...middleware)
	}

}