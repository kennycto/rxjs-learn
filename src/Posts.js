// * interval
// * skipUntil

import { from } from "rxjs";
import {
  mergeMap,
  concatMap,
  switchMap,
  concatAll,
  combineAll,
  mergeAll,
  toArray,
} from "rxjs/operators";
import React from "react";
import "./App.css";

const userIds = [1, 2, 3, 4, 5];
const USER_POSTS_URL = "https://jsonplaceholder.typicode.com/posts?userId=";

class App extends React.PureComponent {
  async componentDidMount() {
    //   const result = await this.getPosts(1);
    // this.setState({ posts: result });

    from(userIds)
      .pipe(
        concatMap((id) => this.getPosts(id)),
        toArray()
      )
      .subscribe((result) => {
        const newPosts = [];
        result.forEach((posts) => newPosts.push(...posts));
        this.setState({ posts: newPosts });
      });

    /*
              const { posts } = this.state;
        const newPosts =
          posts && posts.length > 0 ? [...posts, ...result] : [...result];
        this.setState({ posts: newPosts });
        */
  }
  state = {};

  render() {
    const { posts } = this.state;
    return (
      <div className="App">
        {posts &&
          posts.map((post) => (
            <div key={post.id}>
              <div>user: {post.userId}</div>
              <div>title: {post.title}</div>
              <div>body: {post.body}</div>
              <br />
            </div>
          ))}
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
