import Express from "express";
const path = require('path')

const defaultLocale: string = process.env.LANG_DEFAULT!
const locales: string[] = process.env.LANG_LANGUAGES!
	.split(',')
	.map(x => x.trim())



function routeFunction(req: Express.Request, res: Express.Response) {
	return function (string: string) {
		let val = path.join('/', string);
		if (res.locale !== defaultLocale) {
			val = path.join('/', res.locale, string)
		}
		return val
	}
}

function routeLocalized(req: Express.Request, res: Express.Response) {
	return function (string: string) {
		let val = string
		if (val === defaultLocale) val = ''
		return path.join('/', val, req.url === '/' ? '' : req.url)
	}
}



export default class Localization implements Middleware {
	handle(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
		const route = req.url.split('/')
		const routeLocale = route[1]

		if (locales.includes(routeLocale)) {
			if (res.locale !== routeLocale) res.setLocale(routeLocale)
		} else {
			if (res.locale !== defaultLocale) res.setLocale(defaultLocale)
		}


		if (routeLocale === defaultLocale) {
			res.status(404);
			res.send({error: 'Not found'});
			return void (0);
		}

		res.locals.route = routeFunction(req, res)
		res.locals.routeLocalized = routeLocalized(req, res)

		next()
	}
}