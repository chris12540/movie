import React, { Component } from "react";

import './register.css';
import Axios from "axios";

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			username: '',
			password: '',
			password2: '',
			usernameTaken: false,
			passwordsMatch: true,
			filledOut: true
		};
	}

	update = (type, payload) => {
		this.setState({
			[type]: payload
		})
	}

	register = () => {
		const { name, username, password, password2 } = this.state;
		if (!name || !username || !password || !password2) {
			this.setState({
				filledOut: false
			})
		} else if (password === password2) {
			Axios.post('/auth/register', { name, username, password }).then(res => {
				if (res) {
					this.setState({
						name: '',
						username: '',
						password: '',
						password2: '',
						usernameTaken: false,
						passwordsMatch: true,
						filledOut: true
					})
					window.location = '/';
				}
			}).catch(error => {
				console.log(error);
				if (error.response.data.message === "Username taken") {
					this.setState({
						usernameTaken: true,
						passwordsMatch: true,
						filledOut: true
					})
				}
			})
		} else {
			this.setState({
				passwordsMatch: false,
				filledOut: true
			})
		}
	}

	render() {
		const { name, username, password, password2, usernameTaken, passwordsMatch, filledOut } = this.state;
		return (
			<div className="register">
				<div className="register-inner">
					<p className={!filledOut ? "filledOut" : "none"}>Fill out all fields</p>
					<input value={name} onChange={e => { this.update('name', e.target.value) }} placeholder="Name" type="text" className="input" />
					<input value={username} onChange={e => { this.update('username', e.target.value) }} placeholder="Username" type="text" className="input" />
					<p className={usernameTaken ? "usernameTaken" : "none"}>Username taken</p>
					<input value={password} onChange={e => { this.update('password', e.target.value) }} placeholder="Password" type="password" className="input" />
					<input value={password2} onChange={e => { this.update('password2', e.target.value) }} placeholder="Re-Type Password" type="password" className="input" />
					<p className={!passwordsMatch ? "passwordsMatch" : 'none'}>Password do not match</p>
					<div onClick={this.register} className="btn login-button">
						REGISTER
					</div>
				</div>
			</div>
		);
	}
}

export default Register;
