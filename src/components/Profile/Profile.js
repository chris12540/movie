import React, { Component } from 'react';
import Axios from 'axios';
import Cloudinary from '../Cloudinary/Cloudinary'
import './profile.css';

class Profile extends Component {
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
			} else {
				// if (window.location.href !== '/')
				// 	window.location = '/';
			}
		})
	}

	render() {
		const { name, username, profilePic } = this.state;
		return (
			<div className="profile">
				<img src={profilePic} alt="" />
				<h1>{name}</h1>
				<h2>{username}</h2>
				<Cloudinary />
			</div>
		);
	}
}

export default Profile;