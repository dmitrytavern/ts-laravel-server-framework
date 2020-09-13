import Express from 'express'

export default class Authenticate {
	handle(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
		console.log('Auth test')

		next()
	}
}