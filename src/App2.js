import { Subject } from "rxjs";
import React from "react";
import List from "./components/List";
import "./App.css";

class App extends React.PureComponent {
    componentDidMount() {
        this.observer = subject.subscribe(
            (data) => this.addItem("Observer 1: " + data),
            (err) => this.addItem(err),
            () => this.addItem("Observer 1 completed")
        );

        subject.next("The first thing i am emitting");

        this.observer2 = subject.subscribe(
            (data) => this.addItem("Observer 2: " + data),
            (err) => this.addItem(err),
            () => this.addItem("Observer 2 completed")
        );

        setTimeout(() => {
            this.observer2.unsubscribe();
            subject.next("The final thing i am emitting");
        }, 3000);
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

// *Subject
// an observer that can emit values
// an observable and an observer
var subject = new Subject();

// you can call .next() to emit stuff, exposes next function

setTimeout(() => subject.next("The second thing i am emitting"), 1000);

setTimeout(() => subject.next("The third thing i am emitting"), 2000);

// behavior subject - observer 2 receives the last or previous value that was emitted from the behavior subject
