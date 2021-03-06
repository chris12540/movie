CREATE EXTENSION citext;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	username CITEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
	profile_pic TEXT NOT NULL
);

CREATE TABLE lists (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE list_items (
	id SERIAL PRIMARY KEY,
	media_id INTEGER NOT NULL,
	title TEXT NOT NULL,
	overview TEXT NOT NULL,
	release_date TEXT NOT NULL,
	score INTEGER NOT NULL,
	poster_path TEXT NOT NULL,
	list_id INTEGER NOT NULL REFERENCES lists (id) ON DELETE CASCADE
);