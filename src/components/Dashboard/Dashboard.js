import React, { Component } from "react";
import Axios from "axios";
import "./dashboard.css";
import Modal from '../Modal/Modal';
import img from '../../images/img.svg';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			page: 1,
			item: {},
			showModal: false,
			userLists: [],
			filter: 'upcoming'
		};
		window.addEventListener('scroll', e => {
			let body = document.body,
				html = document.documentElement;

			let height = Math.max(body.scrollHeight, body.offsetHeight,
				html.clientHeight, html.scrollHeight, html.offsetHeight);

			const { list, page, filter } = this.state;
			if (window.scrollY + window.innerHeight >= height) {
				this.request(filter, page).then(res => {
					const updatedList = [...list, ...res.results];
					this.setState({
						list: updatedList,
						page: page + 1
					})
				})
			}
		})
	}

	request(filter, page) {
		return Axios.get(
			`https://api.themoviedb.org/3/movie/${filter}?api_key=${
			process.env.REACT_APP_API_KEY
			}&page=${page}&region=US`
		).then(res => res.data)
	}

	search = () => {
		this.setState({

		})
	}

	showModal = id => {
		const { list } = this.state;
		const index = list.findIndex(item => id === item.id)
		this.setState({
			item: list[index],
			showModal: true
		})
	}

	closeModal = () => {
		this.setState({
			item: {},
			showModal: false
		})
	}

	populate = () => {
		const { filter } = this.state;
		Axios.all([this.request(filter, this.state.page), this.request(filter, this.state.page + 1)]).then(res => {
			console.log(res)
			let list = [...res[0].results, ...res[1].results];
			this.setState({
				list: list,
				page: 3
			})
		});
	}

	componentDidMount() {
		this.populate();
		Axios.get('/api/lists').then(lists => {
			this.setState({
				userLists: lists.data
			})
		})
	}

	render() {
		const list = this.state.list.length ? (
			this.state.list.map(item => {
				return (
					<div key={item.id}>
						<img
							onClick={() => { this.showModal(item.id) }}
							src={item.poster_path ? `https://image.tmdb.org/t/p/w185${item.poster_path}` : img}
							alt=""
							className="card"
						/>
					</div>
				);
			})
		) : (
				<h1>Loading...</h1>
			);
		return (
			<div className="dashboard">
				{list}
				{!this.state.showModal || <Modal closeModal={this.closeModal} item={this.state.item} userLists={this.state.userLists} />}
				{/* <button onClick={() => { this.filter(popular) }}>popular</button>
				<button onClick={() => { this.filter(upcoming) }}>upcoming</button>
				<button onClick={() => { this.filter(popular) }}>popular</button> */}
				<div onClick={this.filter} className="search"><i className="icon fas fa-filter"></i></div>
				<div onClick={this.search} className="search"><i className="icon fab fa-sistrix"></i></div>
			</div>
		)
	}
}

export default Dashboard;
