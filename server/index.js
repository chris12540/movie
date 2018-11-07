const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const session = require("express-session");
require("dotenv").config();

const authController = require("./controllers/authController");
const listController = require('./controllers/listController');

const app = express();

// Use for built app
// app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json());

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 60 }
	})
);

massive(process.env.CONNECTION_STRING).then(database => {
	app.set("db", database);
});

app.post("/auth/login", authController.login);
app.post("/auth/register", authController.register);
app.get('/auth/me', authController.me);
app.post('/auth/logout', authController.logout);

app.get('/api/lists', listController.lists);
app.get('/api/userLists', listController.userLists);
app.post('/api/lists', listController.addList);
app.post('/api/lists/:id', listController.addToList);
app.delete('/api/lists/:id', listController.deleteList);
app.delete('/api/lists/media/:id', listController.deleteMedia);

const PORT = process.env.SERVER_PORT || 25565;
app.listen(PORT, () => {
	console.log(`Server shipped on port ${PORT} ⛵️`);
});

//Run app, then load http://localhost:port in a browser to see the output.
