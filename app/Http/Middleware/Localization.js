const path = require('path')

const defaultLocale = process.env.LANG_DEFAULT
const locales = process.env.LANG_LANGUAGES
	.split(',')
	.map(x => x.trim())



function routeFunction(req, res) {
	return function (string) {
		let val = path.join('/', string);
		if (res.locale !== defaultLocale) {
			val = path.join('/', res.locale, string)
		}
		return val
	}
}

function routeLocalized(req, res) {
	return function (string) {
		let val = string
		if (val === defaultLocale) val = ''
		return path.join('/', val, req.url === '/' ? '' : req.url)
	}
}



class Localization {
	handle(req, res, next) {
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

module.exports = Localization