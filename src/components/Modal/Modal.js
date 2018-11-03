import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './modal.css';
import Axios from 'axios';

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
			showPoster: false,
			videoId: '',
			userLists: [
				{
					id: 1,
					name: 'My List',
					list: [
						{
							id: 200,
							poster_path: '/ahasdfarraeh',
							title: 'Raplh Breaks the Internet',
							overview: '',
							release: '2018-11-21',
							score: 0
						}
					]
				},
				{
					id: 2,
					name: 'Our List'
				}
			]
		}
	}

	rotateCard = () => {
		this.setState({
			showPoster: !this.state.showPoster
		})
	}

	componentDidUpdate(prevProps) {
		if (prevProps.item.id !== this.props.item.id) {
			this.setState({
				id: this.props.item.id,
				poster: this.props.item.poster_path,
				title: this.props.item.title,
				overview: this.props.item.overview,
				release: this.props.item.release_date,
				score: this.props.item.vote_average,
			})
		}
	}

	componentDidMount() {
		const query = encodeURI(this.state.title);
		Axios.get(`https://www.googleapis.com/youtube/v3/search?part=id&q=${query}%20Trailer&maxResults=1&key=${process.env.REACT_APP_KEY}`).then(res => {
			this.setState({ videoId: res.data.items[0].id.videoId });
		})
	}

	render() {
		const { id, poster, title, overview, release, score, showPoster, videoId } = this.state;
		console.log(this.state.title);
		const userLists = this.state.userLists.map(list => {
			return <option value={list.name}>{list.name}</option>
		})
		const length = 200;
		return (
			<div className="modal-container">
				<div onClick={this.props.closeModal} className="modal-background"></div>
				<div className={showPoster ? 'modal-rotate' : "modal-rotate rotate"} >
					<div className="rotate-card" onClick={this.rotateCard}> -> </div>
					<img src={`http://image.tmdb.org/t/p/w300${poster}`} alt="" className='poster' />
					<div className='modal'>
						{videoId ?
							<div className="resp-container"><iframe className="resp-iframe" src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
							: ''
						}
						<h1 className="title">{title}</h1>
						<hr />
						<p className="overview">{window.screen.width < 600 && overview.length > length ? overview.substring(0, length) + "..." : overview}</p>
						<div className="release-score">
							<p className="release">{release}</p>
							<p className="score">{score}</p>
						</div>
						{userLists.length ?
							<div className="add-to-list">
								<select name="lists" id="">
									{userLists}
								</select>
								<button className="add">+</button>
							</div>
							: <Link to="/login" className="btn">Login to add to a list</Link>}
					</div>
				</div>
			</div>
		);
	}
}

export default Modal;