export default function (app: Router): void {
	const { view, middleware } = process.app.router


	app.get('/', view('MainController@index'))
	app.get('/api', middleware('auth'), view('MainController@index'))

	app.get('/api/test', view('MainController@index'))
	app.get('/api/test/pro', view('MainController@index'))

}