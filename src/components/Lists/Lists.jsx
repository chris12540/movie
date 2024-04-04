import { Component } from "react";
import Axios from "axios";
import { groupBy } from "lodash";
import { Link } from "react-router-dom";
import addMovie from "../../images/AddMovie.svg";

import "./lists.css";

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      listName: "",
      addList: false,
    };
  }

  getLists = () => {
    Axios.get("/api/userLists").then((res) => {
      const groupedLists = groupBy(res.data, "name");
      this.setState({
        lists: groupedLists,
      });
    });
  };

  componentDidMount() {
    this.getLists();
  }

  deleteList = (id) => {
    console.log("---------list id", id);
    Axios.delete(`/api/lists/${id}`).then((res) => {
      if (res.status === 204) {
        this.getLists();
      }
    });
  };

  deleteMovie = (id) => {
    Axios.delete(`/api/lists/media/${id}`).then((res) => {
      if (res.status === 204) {
        this.getLists();
      }
    });
  };

  addList = () => {
    const { listName } = this.state;
    Axios.post("/api/lists", { listName }).then((res) => {
      if (res.status === 201) {
        this.setState({
          listName: "",
          addList: false,
        });
        this.getLists();
      }
    });
  };

  render() {
    const { lists, addList } = this.state;
    const userLists = [];
    for (let list in lists) {
      lists[list][0].title !== null
        ? userLists.push(
            <div key={lists[list][0].list_id} className="list-container">
              <h1 className="list-title">
                <span onClick={() => {}}>{list}</span>{" "}
                {list !== "My List" && (
                  <i
                    className="delete-list fas fa-trash-alt"
                    onClick={() => this.deleteList(lists[list][0].list_id)}
                  ></i>
                )}
              </h1>
              <div className="list">
                {lists[list].map((media) => {
                  return (
                    <div key={media.id} className="movie">
                      <img
                        src={`https://image.tmdb.org/t/p/w185${media.poster_path}`}
                        alt=""
                      />
                      <i
                        className="delete-movie fas fa-trash-alt"
                        onClick={() => this.deleteMovie(media.id)}
                      ></i>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        : userLists.push(
            <div key={lists[list][0].list_id} className="list-container">
              <h1>
                {list}{" "}
                {list !== "My List" && (
                  <i
                    className="delete-list fas fa-trash-alt"
                    onClick={() => this.deleteList(lists[list][0].list_id)}
                  ></i>
                )}
              </h1>
              <div className="list">
                <Link to="/">
                  <img src={addMovie} alt="" />
                </Link>
              </div>
            </div>
          );
    }
    return (
      <div className="lists">
        {userLists}
        {addList ? (
          <input
            autoFocus
            type="text"
            className="list-input"
            placeholder="List Name"
            onKeyPress={(e) => {
              e.key === "Enter" && this.addList();
            }}
            onChange={(e) => {
              this.setState({ listName: e.target.value });
            }}
          />
        ) : (
          <div
            className="add-list"
            onClick={() => {
              this.setState({ addList: true });
            }}
          >
            <p className="plus">+</p>
            <h1>Add List...</h1>
          </div>
        )}
      </div>
    );
  }
}

export default Lists;
