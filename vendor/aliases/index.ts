const path = require('path')
const moduleAlias = require('module-alias')

moduleAlias.addAliases({
	'@app': path.resolve('app'),
	'@vendor': path.resolve('vendor'),
	'@routes': path.resolve('routes'),
	'@database': path.resolve('database')
})