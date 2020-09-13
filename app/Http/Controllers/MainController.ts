import Express from "express";

export default class MainController {

	index(req: Express.Request, res: Express.Response) {
		res.render('index', {title: 'Wow', message: 'Hello'})
	}

}