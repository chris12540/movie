import React, { Component } from 'react';
import Logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import './hamburgers.css'
import "./nav.css";
import Axios from 'axios';

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			username: '',
			profilePic: '',
			isActive: false
		}
	}

	componentDidMount() {
		Axios.get('/auth/me').then(res => {
			if (res.data) {
				const { name, username, profilePic } = res.data;
				this.setState({
					name, username, profilePic
				})
			} else {
				// if (window.location.href !== '/')
				// 	window.location = '/';
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
					profilePic: '',
					isActive: false
				})
			}
		})
	}

	render() {
		const { name, username, profilePic, isActive } = this.state;
		return (
			<div className="nav-outer">
				<nav>
					<div className="nav-inner">
						<Link to="/" className="home-button">
							<img src={Logo} height="100px" alt="" />
						</Link>
						{!username ?
							<Link to="/login" className="btn nav-login">
								LOGIN
							</Link>
							:
							<div className="menu">
								<Link to='/lists' className="nav-links"><i className="fas fa-list-ul"></i></Link>
								<button onClick={() => { this.setState({ isActive: !isActive }) }} className={isActive ? "hamburger hamburger--squeeze is-active" : "hamburger hamburger--squeeze"} type="button">
									<span className="hamburger-box">
										<span className="hamburger-inner"></span>
									</span>
								</button>
							</div>
						}
					</div>
				</nav>
				<div className={isActive ? "userInfo slide" : "userInfo"}>
					<div className="userInfo-inner">
						<img className="profilePic" src={profilePic ? profilePic : ""} alt="" />
						<h2 className="name">{name}</h2>
						<p className="username">{username}</p>
						{username ? <div onClick={this.logout} className="logout">LOGOUT</div> : ""}
					</div>
				</div>
			</div>
		);
	}
}

export default Nav;
