import path = require("path");

import * as express from 'express'
import * as helmet from "helmet";
import * as cookieParser from "cookie-parser"
import * as i18n from 'i18n'

import Http from "@vendor/Http";

const app 		= express();
const router 	= express.Router()
const http    = new Http()

i18n.configure({
	locales: process.env.LANG_LANGUAGES!.split(',').map(x => x.trim()),
	defaultLocale: process.env.LANG_DEFAULT!,
	directory: path.resolve(process.env.PATH_LANG!)
})



/*
*   Init default libs
* */

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(i18n.init)


/*
* 	Init view engine
* */

app.set('views', path.resolve(process.env.PATH_VIEWS!));
app.set('view engine', 'pug');


/*
* 	Init static directories
* */

app.use(express.static(process.env.PATH_PUBLIC!))


/*
* 	Init middlewares
* */

for (const handle of http.getGlobalMiddlewareActions()) {
	app.use(handle)
}


/*
* 	Init Routes
* */

import web from "@routes/web"
import api from "@routes/api"

const methods: RouterActions = {
	view: http.getControllerAction.bind(http),
	middleware: http.getRouteMiddlewareAction.bind(http)
}

web(router, methods)
api(router, methods)

app.use('(/([a-z]{2}|)|)', router)



export default app