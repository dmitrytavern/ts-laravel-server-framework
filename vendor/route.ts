import Kernel from "@app/Http/Kernel";
import requireController from "@vendor/requires/requireController";
import requireMiddleware from "@vendor/requires/requireMiddleware";

const kernel = new Kernel()

export const view = requireController.bind(kernel)
export const middleware = requireMiddleware.bind(kernel)

export default {
	view,
	middleware
}