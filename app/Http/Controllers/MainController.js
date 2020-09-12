
class MainController {

	index(req, res) {
		res.render('index', {title: 'Wow', message: 'Hello'})
	}

}

module.exports = MainController