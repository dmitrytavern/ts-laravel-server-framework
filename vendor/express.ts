import path = require("path");

import * as express from 'express'
import * as helmet from "helmet"
import * as cookieParser from "cookie-parser"

import Http from "@vendor/http"

const app 		= express()
const router 	= express.Router()
const http    = new Http()



/*
*   Init default libs
* */

app.use(helmet())
app.use(express.json())
app.use(cookieParser())


/*
* 	Init view engine
* */

app.set('views', path.resolve(process.env.PATH_VIEWS!))
app.set('view engine', 'pug')


/*
* 	Init static directories
* */

app.use(express.static(process.env.PATH_PUBLIC!))


/*
* 	Init middleware
* */

for (const middleware of http.getGlobalMiddleware()) {
	app.use(middleware)
}


/*
* 	Init Routes
* */

import web from "@routes/web"
import api from "@routes/api"

const methods: RouterActions = {
	view: http.getControllerAction.bind(http),
	middleware: http.getMiddleware.bind(http)
}

web(router, methods)
api(router, methods)

app.use('(/([a-z]{2}|)|)', router)



export default app