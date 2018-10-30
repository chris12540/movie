import React, { Component } from "react";
import Axios from "axios";

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authorized: false,
			list: "",
			page: 1
		};
		this.baseURL = "";
		this.language = "";
	}

	request(mediaType, filter, page) {
		console.log("this ran");
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

	componentDidMount() {
		this.request("movie", "upcoming", this.state.page);
	}

	render() {
		const list = this.state.list.length ? (
			this.state.list.map(item => {
				return (
					<img src={`https://image.tmdb.org/t/p/w92/${item.poster_path}`} alt="" className="card" height="100px" />
				);
			})
		) : (
			<h1>Loading...</h1>
		);
		return <div className="dashboard">{list}</div>;
	}
}

export default Dashboard;
