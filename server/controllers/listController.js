const genMes = 'There is a problem on our end, our engineers are looking into it.';

module.exports = {
	userLists: (req, res) => {
		req.session.user &&
			req.app.get('db').find_user({ username: req.session.user.username }).then(users => {
				req.app.get('db').get_user_lists({ ...users[0] }).then(userLists => {
					res.json(userLists);
				}).catch(error => {
					console.log('Error getting user lists', error);
					res.status(500).send(genMes);
				})
			}).catch(error => {
				console.log('Error finding user', error);
				res.status(500).send(genMes);
			})
	},
	addToList: (req, res) => {
		req.session.user &&
			req.app.get('db').add_to_list({ ...req.body }).then(response => {
				res.json(response);
			}).catch(error => {
				console.log('Error adding to list', error);
				releaseEvents.status(500).send(genMes)
			})
	}
}