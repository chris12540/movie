import { Component } from "react";
import "./reset.css";
import "./App.css";
import routes from "./routes";
import Nav from "./components/Nav/Nav";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="App no-focus-outline">
        <Nav />
        {routes}
      </div>
    );
  }
}

export default App;
