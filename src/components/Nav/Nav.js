import React, { Component } from 'react';
import Logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import "./nav.css";
import Axios from 'axios';

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			username: '',
			profilePic: ''
		}
	}

	componentDidMount() {
		Axios.get('/auth/me').then(res => {
			if (res.data) {
				const { name, username, profilePic } = res.data;
				this.setState({
					name, username, profilePic
				})
			}
		})
	}

	logout = () => {
		Axios.post('/auth/logout').then(res => {
			console.log(res);
			if (res.status === 200) {
				this.setState({
					name: '',
					username: '',
					profilePic: ''
				})
			}
		})
	}

	render() {
		const { name, username, profilePic } = this.state;
		return (
			<div className="nav-outer">
				<nav>
					<Link to="/" className="home-button">
						<img src={Logo} height="100px" alt="" />
					</Link>
					{username ? <div onClick={this.logout} className="logout">LOGOUT</div> : ""}
					{!username ?
						<Link to="/login" className="btn nav-login">
							LOGIN
					</Link>
						:
						<div className="userInfo">
							<img className="profilePic" src={profilePic ? profilePic : ""} alt="" />
							<h2 className="name">{name}</h2>
							<p className="username">{username}</p>
						</div>
					}
				</nav>
			</div>
		);
	}
}

export default Nav;
