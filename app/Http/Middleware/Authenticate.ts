import {Request, Response, NextFunction} from 'express'

export default class Authenticate {
	handle(req: Request, res: Response, next: NextFunction) {
		console.log('Auth test')

		next()
	}
}