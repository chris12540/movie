import React, { Component } from "react";

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: this.props.username
		};
	}
	render() {
		return (
			<div className="register">
				<input type="text" className="username" />
			</div>
		);
	}
}

export default Register;
