// asyncSubject

import { AsyncSubject } from "rxjs";
import React from "react";
import List from "./components/List";
import "./App.css";

class App extends React.PureComponent {
    constructor() {
        super();

        // receives last thing sent when complete is fired
        this.subject = new AsyncSubject();
    }
    componentDidMount() {
        this.observer = this.subject.subscribe(
            (data) => this.addItem("Observer 1: " + data),
            (err) => this.addItem(err),
            () => this.addItem("Observer 1 completed")
        );

        var i = 1;
        setInterval(() => this.subject.next(i++), 100);

        this.subject.next("The first thing i am emitting");
        this.subject.next("another first thing i am emitting");

        this.subject.next("...observer 2 is about to subscribe");

        setTimeout(() => {
            this.observer2 = this.subject.subscribe(
                (data) => this.addItem("Observer 2: " + data),
                (err) => this.addItem(err),
                () => this.addItem("Observer 2 completed")
            );
            this.subject.complete();
            // it also emits "complete"
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
