// * interval
// * skipUntil

import { fromEvent, timer } from "rxjs";
import { debounce, switchMap } from "rxjs/operators";
import React from "react";
import "./App.css";
import { searchRequest } from "./utils/utils";

const USER_POSTS_URL = "https://jsonplaceholder.typicode.com/posts?userId=";

class App extends React.PureComponent {
  async componentDidMount() {
    fromEvent(this.searchInput, "input")
      .pipe(
        debounce(() => timer(250)),
        switchMap((e) => searchRequest(e.target.value))
      )
      .subscribe((results) => {
        this.setState({
          results,
        });
      });
  }
  state = {
    results: [],
  };

  render() {
    return (
      <div className="App">
        <label htmlFor="searchInput" id="searchLabel">
          Search
        </label>
        <input
          id="searchInput"
          ref={(ref) => (this.searchInput = ref)}
          type="text"
        ></input>
        <ul id="output">
          {this.state.results.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  getPosts = async (id) => {
    const url = new URL(USER_POSTS_URL + id);
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };
    const request = new Request(url, requestOptions);
    try {
      const response = await fetch(request);

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("shit happened");
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };
}

export default App;
