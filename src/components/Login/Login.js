import React, { Component } from "react";
import { Route } from "react-router-dom";
import Register from "../Register/Register";

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		};
	}
	render() {
		return (
			<div className="login">
				<input
					onChange={e => {
						this.setState({ username: e.target.value });
					}}
					type="text"
					className="username"
				/>
				<input
					onChange={e => {
						this.setState({ password: e.target.value });
					}}
					type="password"
					className="password"
				/>
				<Route path="/regster" render={<Register username={this.state.username} />} />
			</div>
		);
	}
}

export default Auth;
