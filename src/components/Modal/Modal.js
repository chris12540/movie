import React, { Component } from 'react';
import './modal.css';

class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.item.id,
			poster: props.item.poster_path,
			title: props.item.title,
			overview: props.item.overview,
			release: props.item.release_date,
			score: props.item.vote_average,
			userLists: []
		}
	}



	componentDidUpdate(prevProps) {
		if (prevProps.item.id !== this.props.item.id) {
			this.setState({
				id: this.props.item.id,
				poster: this.props.item.poster_path,
				title: this.props.item.title,
				overview: this.props.item.overview,
				release: this.props.item.release_date,
				score: this.props.item.vote_average
			})
		}
	}

	render() {
		const { id, poster, title, overview, release, score } = this.state;
		console.log(this.state.title);
		const userLists = this.state.userLists.map(list => {
			return <option value={list.name}>{list.name}</option>
		})

		return (
			<div className="modal-container">
				<div onClick={this.props.closeModal} className="modal-background"></div>
				<img src={`http://image.tmdb.org/t/p/w185${poster}`} alt="" className="poster" />
				<div className="modal">
					<h1 className="title">{title}</h1>
					<hr />
					<p className="overview">{overview}</p>
					<p className="release">{release}</p>
					<p className="score">{score}</p>
					<select name="" id="">
						{userLists}
					</select>
				</div>
			</div>
		);
	}
}

export default Modal;