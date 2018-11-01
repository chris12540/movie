import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import Axios from "axios";

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		};
	}

	login = () => {
		const { username, password } = this.state;
		Axios.post('/auth/login', { username, password }).then(() => {
			window.location.pathname = '/';
		})
	};

	render() {
		return (
			<div className="login">
				<div className="login-inputs">
					<input
						onKeyPress={e => { e.key === 'Enter' && this.login() }}
						placeholder="Username"
						onChange={e => {
							this.setState({ username: e.target.value });
						}}
						type="text"
						className="input"
					/>
					<input
						onKeyPress={e => { e.key === 'Enter' && this.login() }}
						placeholder="Password"
						onChange={e => {
							this.setState({ password: e.target.value });
						}}
						type="password"
						className="input"
					/>
					<div onClick={this.login} className="btn login-button">
						LOGIN
					</div>
					<Link className="btn" to="/register">
						REGISTER
					</Link>
				</div>
			</div>
		);
	}
}

export default Auth;
