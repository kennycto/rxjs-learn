import { Observable, fromEvent } from "rxjs";
import { share } from "rxjs/operators";
import React from "react";
import List from "./components/List";
import "./App.css";

class App extends React.PureComponent {
    componentDidMount() {
        // next callback passed into subscribe
        // but technically it takes next, error, complete
        this.observer = observable.subscribe(
            (value) => this.addItem(value),
            (err) => this.addItem(err),
            () => this.addItem("completed")
        );
        // setTimeout(() => this.observer.unsubscribe(), 6001);

        // this subscribes later
        setTimeout(() => {
            this.observer2 = observable.subscribe((value) =>
                this.addItem("Subscriber 2: " + value)
            );
        }, 1000);

        // observer 2 is now a child of observer 1
        // this.observer.add(this.observer2);

        // setTimeout(() => {
        //     var subscription2 = observable2.subscribe((x) => {
        //         console.log(x);
        //         this.addItem(x.clientX);
        //     });
        // }, 2000);
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
        this.setState({
            items: [...this.state.items, val],
        });
    };
}

export default App;

var observable = Observable.create((observer) => {
    try {
        observer.next("Hey!");
        observer.next("How are you?");
        // throw new Error("this is an error");
        setInterval(() => observer.next("I am good"), 2000);
    } catch (err) {
        observer.error(err);
    }
}).pipe(share());

// adding share at end makes it hot (multicasting)

// observer is hot when producer is emitting outside of the observable (getting latest value, instead of old values)
// like hot swap, not getting older values that have already been emitted

// can create observables from creation operators
var observable2 = fromEvent(document, "mousemove");
