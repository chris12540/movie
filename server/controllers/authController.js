const bcrypt = require('bcrypt');
const saltRounds = 12;

module.exports = {
	me: (req, res) => {
		res.json(req.session.user);
	},
	login: (req, res) => {
		const { username, password } = req.body;
		req.app
			.get("db")
			.find_user({ username })
			.then(users => {
				if (users.length) {
					bcrypt.compare(password, users[0].password).then(passwordsMatch => {
						if (passwordsMatch) {
							const { name, username, profile_pic: profilePic } = users[0];
							req.session.user = { name, username, profilePic };
							console.log(`Added user ${username} to session: ${req.session.user.username}`)
							res.json(req.session.user);
						} else {
							res.status(403).json({ message: 'Either Username or Password is incorrect.' });
						}
					});
				} else {
					res.status(403).json({ message: 'Either Username or Password is incorrect.' });
				}
			})
			.catch(error => {
				console.log("Error in login ", error);
				res.status(500).json({ message: "There was an error on our end. We are working on it." });
			});
	},
	logout: (req, res) => {
		req.session.destroy();
		res.sendStatus(200);
	},
	register: (req, res) => {
		const { name, username, password } = req.body;
		console.log(username);
		req.app.get('db').find_user({ username }).then(users => {
			if (users.length) {
				res.status(409).json({ message: 'Username taken' });
			} else {
				bcrypt.hash(password, saltRounds).then(password => {
					const profilePic = `https://robohash.org/${username}`
					req.app.get('db').create_user({ name, username, password, profilePic })
						.then(users => {
							req.app.get('db').init_user_list({ id: users[0].id }).then(() => {
								console.log('register ');
								req.session.user = { name, username, profilePic };
								res.json({ ...req.session.user })
							})
						})
						.catch(error => {
							console.log("error", error);
							res.status(500).json({ message: "Something happened on our end. We are working on it." });
						});
				});
			}
		}).catch(error => {
			console.log('Error finding user', error);
			res.status(500).json({ message: 'Error finding user' });
		})
	}
};
