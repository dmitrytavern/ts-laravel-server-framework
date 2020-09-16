import {Request, Response, NextFunction} from 'express'

export default class Authenticate {
	handle(req: Request, res: Response, next: NextFunction) {
		next()
	}
}