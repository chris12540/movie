import React from "react";
import Logo from "../../images/Logo.svg";
import "./nav.css";

const Nav = props => {
	return (
		<div className="nav-outer">
			<nav>
				<img src={Logo} height="100px" alt="" />
			</nav>
		</div>
	);
};

export default Nav;
