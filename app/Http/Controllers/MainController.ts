import {Request, Response} from "express";


export default class MainController {

	index(req: Request, res: Response) {
		res.render('index', {title: 'Wow', message: 'Hello'})
	}

}