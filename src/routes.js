import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import Lists from './components/Lists/Lists'
import Profile from './components/Profile/Profile'

export default (
	<Switch>
		<Route path="/profile" component={Profile} />
		<Route path="/login" component={Login} />
		<Route path="/register" component={Register} />
		<Route path="/lists" component={Lists} />
		<Route path="/" component={Dashboard} />
	</Switch>
);
