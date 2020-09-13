import Express from "express";

declare global {
	type RouterFunction = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => void

	interface Router extends Express.Router {}

	interface RouterActions {
		view(str: string): RouterFunction,
		middleware(str: string | string[]): RouterFunction | RouterFunction[]
	}
}