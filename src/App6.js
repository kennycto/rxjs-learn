// * Operators
// takes the original observable and return a new observable
// pure functions, don't modify the variables out of its scope
// * marble diagrams - used to explain the operators

// instance - majority of rxjs
// static - creates observables

// * merge operator (combination category)
// * combines observables into one observable output

// * map (transformation op)

import { Observable, merge } from "rxjs";
import { map } from "rxjs/operators";
import React from "react";
import List from "./components/List";
import "./App.css";

class App extends React.PureComponent {
    constructor() {
        super();

        this.observable = Observable.create((observer) => {
            observer.next("Hey guys!");
        });

        this.observable2 = Observable.create((observer) => {
            observer.next("How is it going");
        });

        this.newObs = merge(this.observable, this.observable2);

        // pipe returns a new observerable
        this.newObs = this.newObs.pipe(map((x) => x.toUpperCase()));
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
