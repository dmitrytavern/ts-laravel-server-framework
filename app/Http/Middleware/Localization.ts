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
		let val = string
		if (val === defaultLocale) val = ''
		return path.join('/', val, req.url === '/' ? '' : req.url)
	}
}



export default class Localization implements Middleware {
	handle(req: Request, res: Response, next: NextFunction) {
		i18n.init(req, res)

		const routeLocale = req.url.split('/')[1]

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
		res.locals.routeLocalized = routeLocalizedFunction(req, res)

		next()
	}
}