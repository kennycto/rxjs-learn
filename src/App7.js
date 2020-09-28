// * from
// * pluck

import { from } from "rxjs";
import { pluck } from "rxjs/operators";
import React from "react";
import List from "./components/List";
import "./App.css";

class App extends React.PureComponent {
    constructor() {
        super();

        this.newObs = from([
            { first: "Gary", last: "Simon", age: 34 },
            { first: "Jane", last: "Simon", age: 34 },
            { first: "John", last: "Simon", age: 34 },
        ]).pipe(pluck("first"));

        // pipe returns a new observerable
    }

    componentDidMount() {
        this.newObs.subscribe((x) => this.addItem(x));
    }
    state = {
        items: [],
    };

    render() {
        const { items } = this.state;
        return (
            <div className="App">
                <List items={items} />
            </div>
        );
    }

    addItem = (val) => {
        this.setState((prevState) => {
            return {
                items: [...prevState.items, val],
            };
        });
    };
}

export default App;
