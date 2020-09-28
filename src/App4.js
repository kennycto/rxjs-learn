// * behavior subject - observer 2 receives the last or previous value that was emitted from the behavior subject

import { ReplaySubject } from "rxjs";
import React from "react";
import List from "./components/List";
import "./App.css";

class App extends React.PureComponent {
    constructor() {
        super();
        // * behavior subject needs an initial argument, observers who join late get the last emitted value too
        // this.subject = new ReplaySubject(2);

        // * receive 30 events within 200ms buffer time (window time)
        // * buffer time: how long you want to store values in the replay subject
        this.subject = new ReplaySubject(30, 500);
    }
    componentDidMount() {
        this.observer = this.subject.subscribe(
            (data) => this.addItem("Observer 1: " + data),
            (err) => this.addItem(err),
            () => this.addItem("Observer 1 completed")
        );

        var i = 1;
        var int = setInterval(() => this.subject.next(i++), 100);

        this.subject.next("The first thing i am emitting");
        this.subject.next("another first thing i am emitting");

        // * gets the last TWO events that was emitted, only because this is a replay(2)
        this.subject.next("...observer 2 is about to subscribe");

        setTimeout(() => {
            this.observer2 = this.subject.subscribe(
                (data) => this.addItem("Observer 2: " + data),
                (err) => this.addItem(err),
                () => this.addItem("Observer 2 completed")
            );
        }, 500);

        // 100     200     300    400    500
        //    1       2       3      4      5
        //                                  obs2
        // maybe it takes the last submitted, and obs2 happens first

        // this.subject.next("The second thing i am emitting");
        // this.subject.next("The third thing i am emitting");
        // this.observer2.unsubscribe();
        // this.subject.next("The final thing i am emitting");
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
