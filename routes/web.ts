import { Router } from "express";
import { view, middleware } from '@vendor/route'

export default function (app: Router): void {

	app.get('/', view('MainController@index'))
	app.get('/api', middleware('auth'), view('MainController@index'))

	app.get('/api/test', view('MainController@index'))
	app.get('/api/test/pro', view('MainController@index'))

}