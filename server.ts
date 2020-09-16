import path = require("path");

import * as express from 'express'
import * as helmet from "helmet"
import * as cookieParser from "cookie-parser"

const app 		          = express()
const expressWebRouter  = express.Router()
const expressApiRouter  = express.Router()
const { http }          = process.app


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

expressWebRouter.use(express.static(process.env.PATH_PUBLIC!))


/*
* 	Init middleware
* */

for (const middleware of http.getMiddlewareGlobal()) {
	expressWebRouter.use(middleware)
}


/*
* 	Init Routes
* */

import web from "@routes/web"
import api from "@routes/api"

web(expressWebRouter)
api(expressApiRouter)

app.use('/', expressWebRouter)
app.use('/api', expressApiRouter)

app.listen(8081, () => {
	console.log('[APP]: Server started')
})