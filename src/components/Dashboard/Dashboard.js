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
			showSearch: false,
			showFilter: false,
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

	search = e => {
		Axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${e.target.value}&page=1`).then(res => {
			this.setState({
				list: res.data.results,
				showSearch: false
			})
		})
	}

	filter(filter, page) {
		Axios.get(
			`https://api.themoviedb.org/3/movie/${filter}?api_key=${
			process.env.REACT_APP_API_KEY
			}&page=${page}&region=US`
		).then(res => {
			this.setState({
				list: res.data.results,
				filter
			})
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
		const { showModal, item, userLists, showSearch, showFilter } = this.state;
		return (
			<div className="dashboard">
				{list}
				{!showModal || <Modal closeModal={this.closeModal} item={item} userLists={userLists} />}
				<div className={showFilter ? "filter-buttons show-filter" : "filter-buttons"}>
					<button onClick={() => { this.filter('popular') }}>Popular</button>
					<button onClick={() => { this.filter('upcoming') }}>Upcoming</button>
					<button onClick={() => { this.filter('top_rated') }}>Top Rated</button>
					<button onClick={() => { this.filter('now_playing') }}>Now Playing</button>
				</div>
				{/* https://res.cloudinary.com/djrk8ejp8/image/upload/v1541796767/kvz3k3m8owextvqwosto.jpg */}
				{showSearch && <input onKeyPress={e => { e.key === 'Enter' && this.search(e) }} type="text" autoFocus onBlur={() => { this.setState({ showSearch: false }) }} className="search-input" />}
				{showSearch || <div onClick={() => { this.setState({ showSearch: !showSearch }) }} className="search"><i className="icon fab fa-sistrix"></i></div>}
				<div onClick={() => { this.setState({ showFilter: !showFilter }) }} className="filter"><i className="icon fas fa-filter"></i></div>
			</div >
		)
	}
}

export default Dashboard;
