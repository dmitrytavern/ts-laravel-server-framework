class Authenticate {
	handle(req, res, next) {
		console.log('Auth test')

		next()
	}
}

module.exports = Authenticate