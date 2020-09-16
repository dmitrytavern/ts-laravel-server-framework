import Express from 'express/index'

/*
*   get Models
*   get Middleware
*   get Controller
* */

import Router from "./Router";
import Http from "./Http";
import Index from "./Database";

export interface IApp {
	router: Router
	http: Http
	database: Index
}


export default class App implements IApp {
	public database: Index = new Index()

	public http: Http = new Http()

	public router: Router = new Router()
}