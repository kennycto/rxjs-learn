// * interval
// * skipUntil

import { Subject, Observable } from "rxjs";
import { skipUntil } from "rxjs/operators";
import React from "react";
import List from "./components/List";
import Input from "./components/Input";
import "./App.css";

class App extends React.PureComponent {
    constructor() {
        super();

        this.obs1 = Observable.create((data) => {
            var i = 1;
            setInterval(() => {
                data.next(i++);
            }, 1000);
        });

        this.obs2 = new Subject();
        setTimeout(() => {
            this.obs2.next("obs2 hey!");
        }, 3000);

        // skipUntil this.obs2 emits or timer
        this.newObs = this.obs1.pipe(skipUntil(this.obs2));
        // this.newObs = this.obs1.pipe(skipUntil(timer(3000));
    }

    componentDidMount() {
        this.newObs.subscribe((x) => this.addItem(x));
        this.obs2.subscribe((x) => this.addItem(x));
    }
    state = {
        items: [],
    };

    render() {
        const { items } = this.state;
        return (
            <div className="App">
                <Input></Input>
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
