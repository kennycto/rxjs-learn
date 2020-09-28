// * behavior subject - observer 2 receives the last or previous value that was emitted from the behavior subject

import { BehaviorSubject, Subject } from "rxjs";
import React from "react";
import List from "./components/List";
import "./App.css";

class App extends React.PureComponent {
    constructor() {
        super();
        // * behavior subject needs an initial argument, observers who join late get the last emitted value too
        this.subject = new BehaviorSubject("First");
    }
    componentDidMount() {
        this.observer = this.subject.subscribe(
            (data) => this.addItem("Observer 1: " + data),
            (err) => this.addItem(err),
            () => this.addItem("Observer 1 completed")
        );

        this.subject.next("The first thing i am emitting");

        // gets the last event that was emitted, only because this is a behavioralSubject
        this.subject.next("...observer 2 is about to subscribe");

        this.observer2 = this.subject.subscribe(
            (data) => this.addItem("Observer 2: " + data),
            (err) => this.addItem(err),
            () => this.addItem("Observer 2 completed")
        );

        this.subject.next("The second thing i am emitting");
        this.subject.next("The third thing i am emitting");
        this.observer2.unsubscribe();
        this.subject.next("The final thing i am emitting");
    }
    state = {
        items: [],
    };

    render() {
        return (
            <div className="App">
                <List items={this.state.items} />
            </div>
        );
    }

    addItem = (val) => {
        console.log(this.state.items, val);
        this.setState((prevState) => {
            return {
                items: [...prevState.items, val],
            };
        });
    };
}

export default App;
