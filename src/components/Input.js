import React from "react";
import { of, from, fromEvent, timer, combineLatest, concat, merge } from "rxjs";
import {
    distinctUntilChanged,
    debounceTime,
    switchMap,
    pluck,
    filter,
    mapTo,
    startWith,
    scan,
    map,
} from "rxjs/operators";
import UserList from "./UserList";

export default class Input extends React.PureComponent {
    state = {
        items: [],
    };

    componentDidMount() {
        this.input$ = fromEvent(this.input, "input").pipe(
            pluck("target", "value"),
            debounceTime(250),
            filter((x) => x.length >= 2 || x.length === 0),
            distinctUntilChanged(),
            // use this to fetch some api, will discard current request if request is still pending and there is another input in the stream
            switchMap((value) =>
                value
                    ? from(this.searchGithub(value))
                    : from(Promise.resolve({ items: [] }))
            )
        );
        this.inputSubscribe = this.input$.subscribe(this.handleResults);
        this.mouseTap$ = fromEvent(document, "click").pipe(
            map((e) => {
                return { x: e.x, y: e.y };
            }),
            mapTo("clicked!")
        );
        this.mouseSubscribe = this.mouseTap$.subscribe(this.handleMouseTap);

        of(1, 2, 3, 4, 5).subscribe(this.print);
        from([1, 2, 3, 4, 5]).subscribe(this.print);
        from(new Promise((resolve) => resolve("resolved value"))).subscribe(
            this.print
        );
        const myMap = new Map();
        myMap.set(1, "Hi");
        myMap.set(2, "there");
        from(myMap).subscribe(this.print);
        from("I'm a string!").subscribe(this.print);

        const timerOne$ = timer(1000, 4000);
        const timerTwo$ = timer(2000, 4000);
        const timerThree$ = timer(3000, 4000);

        // combineLatest(timerOne$, timerTwo$, timerThree$).subscribe(
        //     ([timerValOne, timerValTwo, timerValThree]) => {
        //         console.log(
        //             `one: ${timerValOne}, two: ${timerValTwo}, three: ${timerValThree}`
        //         );
        //     }
        // );

        combineLatest(
            timerOne$,
            timerTwo$,
            timerThree$,
            (timerValOne, timerValTwo, timerValThree) => {
                return `one: ${timerValOne}, two: ${timerValTwo}, three: ${timerValThree}`;
            }
        ).subscribe(this.print);

        const redTotal = document.getElementById("red-total");
        const blackTotal = document.getElementById("black-total");
        const total = document.getElementById("total");

        const addOneClick$ = (id) =>
            fromEvent(document.getElementById(id), "click").pipe(
                // map every click to 1
                mapTo(1),
                // keep a running total
                scan((acc, curr) => acc + curr, 0),
                startWith(0)
            );

        combineLatest(addOneClick$("red"), addOneClick$("black")).subscribe(
            ([red, black]) => {
                redTotal.innerHTML = red;
                blackTotal.innerHTML = black;
                total.innerHTML = red + black;
            }
        );

        const asyncTask = (delay) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(delay);
                    resolve(delay);
                }, delay);
            });
        };

        concat(
            from(asyncTask(1000)),
            from(asyncTask(2000)),
            from(asyncTask(3000))
        ).subscribe((values) => {
            console.log("concat emitted " + values);
        });

        merge(
            from(asyncTask(2500)),
            from(asyncTask(1000)),
            from(asyncTask(2000))
        ).subscribe((values) => {
            console.log("merge emitted " + values);
        });
    }

    render() {
        return (
            <div>
                <div>
                    <button id="red">Red</button>
                    <button id="black">Black</button>
                </div>
                <div>
                    Red: <span id="red-total"></span>
                </div>
                <div>
                    Black: <span id="black-total"></span>
                </div>
                <div>
                    Total: <span id="total"></span>
                </div>
                <input ref={(el) => (this.input = el)} type="text"></input>
                <UserList items={this.state.items} />
            </div>
        );
    }

    handleResults = (data) => {
        this.setState({
            items: data.items,
        });
    };

    searchGithub = (query) =>
        fetch(`https://api.github.com/search/users?q=${query}`).then((data) =>
            data.json()
        );

    handleMouseTap = (e) => {
        console.log(e);
    };

    print = (input) => console.log(input);
}
