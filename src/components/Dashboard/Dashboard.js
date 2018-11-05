import React, { Component } from "react";
import Axios from "axios";
import "./dashboard.css";
import Modal from '../Modal/Modal'

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			page: 1,
			item: {},
			showModal: false,
			userLists: []
		};
	}

	request(mediaType, filter, page) {
		Axios.get(
			`https://api.themoviedb.org/3/${mediaType}/${filter}?api_key=${
			process.env.REACT_APP_API_KEY
			}&page=${page}&region=US`
		).then(res => {
			this.setState({
				list: res.data.results
			});
		});
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

	componentDidMount() {
		this.request("movie", "upcoming", this.state.page);
		Axios.get('/api/userLists').then(lists => {
			this.setState({
				userLists: lists.data
			});
		})
	}

	render() {
		const list = this.state.list.length ? (
			this.state.list.map(item => {
				return (
					<div key={item.id}>
						<img
							onClick={() => { this.showModal(item.id) }}
							src={item.poster_path ? `https://image.tmdb.org/t/p/w185${item.poster_path}` : ""}
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
			</div>
		)
	}
}

export default Dashboard;
