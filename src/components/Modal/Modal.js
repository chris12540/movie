import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './modal.css';
import Axios from 'axios';
import img from '../../images/img.svg';

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
			videoId: '',
			userLists: props.userLists,
			showPoster: false
		}
	}

	rotateCard = () => {
		this.setState({
			showPoster: !this.state.showPoster
		})
	}

	// componentDidUpdate(prevProps) {
	// 	if (prevProps.item.id !== this.props.item.id) {
	// 		this.setState({
	// 			id: this.props.item.id,
	// 			poster: this.props.item.poster_path,
	// 			title: this.props.item.title,
	// 			overview: this.props.item.overview,
	// 			release: this.props.item.release_date,
	// 			score: this.props.item.vote_average,
	// 			userLists: this.props.userLists,
	// 			added: false
	// 		})
	// 	}
	// }

	added = () => {
		this.setState({
			added: true
		})
	}

	addToList = () => {
		const list = this.getSelection('value');
		Axios.post(`/api/lists/${list}`, { listId: list, ...this.props.item }).then(res => {
			res.status === 201 &&
				this.added();
		})
	}

	getSelection = (type) => {
		const lists = document.getElementById('lists')
		return type === 'value' ? lists.options[lists.selectedIndex].value
			: type === 'name' ? lists.options[lists.selectedIndex].text
				: "";
	}


	componentDidMount() {
		const query = encodeURI(this.state.title);
		Axios.get(`https://www.googleapis.com/youtube/v3/search?part=id&q=${query}%20Trailer&maxResults=1&key=${process.env.REACT_APP_KEY}`).then(res => {
			this.setState({ videoId: res.data.items[0].id.videoId });
		})

	}

	render() {
		const { id, poster, title, overview, release, score, showPoster, videoId, added } = this.state;
		const userLists = this.state.userLists.map(list => {
			return <option key={list.id} name={list.name} value={list.id}>{list.name}</option>
		})
		return (
			<div className={`modal-container ${id}`}>
				{/* <button onClick={this.added}>added</button> */}
				<div onClick={this.props.closeModal} className="modal-background"></div>
				<div className={showPoster ? 'modal-rotate' : "modal-rotate rotate"} >
					<div className="rotate-card" onClick={this.rotateCard}> -> </div>
					<img src={`http://image.tmdb.org/t/p/w300${poster}`} alt="" className='poster' />
					<div className='modal'>
						{videoId ?
							<div className="resp-container"><iframe title="trailer" className="resp-iframe" src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
							: ''
						}
						<h1 className="title">{title}</h1>
						<p className="overview">{overview}</p>
						<div className="release-score">
							<p className="release">{release}</p>
							<p className="score">{score}</p>
						</div>
						{userLists.length ?
							<div className="add-to-list">
								<select name="lists" id="lists">
									{userLists}
								</select>
								<button onClick={this.addToList} className="add">Add</button>
							</div>
							: <Link to="/login" className="btn">Login to add to a list</Link>}
					</div>
				</div>
				{added && <div className="added">
					<h1>{title} Added To {this.getSelection('name')}</h1>
				</div>}
			</div>
		);
	}
}

export default Modal;