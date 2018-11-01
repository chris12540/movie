const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const session = require("express-session");
require("dotenv").config();

const authController = require("./controllers/authController");

const app = express();
app.use( express.static( `${__dirname}/../build` ) );
app.use(bodyParser.json());

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true
	})
);

massive(process.env.CONNECTION_STRING).then(database => {
	app.set("db", database);
});

app.post("/auth/login", authController.login);
app.post("/auth/register", authController.register);
app.get('/auth/me', authController.me);
app.post('/auth/logout', authController.logout);

const PORT = process.env.SERVER_PORT || 25565;
app.listen(PORT, () => {
	console.log(`Server shipped on port ${PORT} ⛵️`);
});

//Run app, then load http://localhost:port in a browser to see the output.
