import React, { Component } from 'react';

class Lists extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lists: []
		}
	}
	render() {
		const lists = this.state.lists.map(list => {
			return <div className="list">
				<h1 className="list-name">{list.name}</h1>

			</div>
		});
		return (
			<div className="lists">
				{lists}
				<div className="add-list">
					<h1 className="plus">+</h1>
					<h1>Add List...</h1>
				</div>
			</div>
		);
	}
}

export default Lists;