import * as i18n from 'i18n'
import { Request, Response, NextFunction } from "express";
const path = require('path')

const defaultLocale: string = process.env.LANG_DEFAULT!
const locales: string[] = process.env.LANG_LANGUAGES!.split(',').map(x => x.trim())

i18n.configure({
	locales,
	defaultLocale,
	directory: path.resolve(process.env.PATH_LANG!)
})


function routeFunction(req: Request, res: Response) {
	return function (string: string) {
		let val = path.join('/', string);
		if (res.locale !== defaultLocale) {
			val = path.join('/', res.locale, string)
		}
		return val
	}
}

function routeLocalizedFunction(req: Request, res: Response) {
	return function (string: string) {
		return path.join('/', string, req.url === '/' ? '' : req.url)
	}
}



export default class Localization implements Middleware {
	private current: string = 'ru'

	handle(req: Request, res: Response, next: NextFunction) {
		i18n.init(req, res)
		const route = req.url.split('/')

		let routeLocale = ''
		if (route[0] === '') route.splice(0, 1)
		if (route[0] !== '') routeLocale = route[0]


		res.locals.route = routeFunction(req, res)
		res.locals.routeLocalized = routeLocalizedFunction(req, res)


		if (locales.includes(routeLocale)) {
			route.splice(0, 1)

			this.current = routeLocale

			res.redirect(path.join('/', route.join('/')))
		}

		req.setLocale(this.current)
		next()
	}
}