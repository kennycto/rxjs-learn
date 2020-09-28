const { of } = require("rxjs");
const { map, filter } = require("rxjs/operators");

const source$ = of(1, 2, 3, 4, 5);

source$.pipe(
    filter((value) => value >= 2),
    map((value) => value + 1)
);

source$.subscribe((value) => console.log(value));

source$.subscribe((value) => console.log("2", value));

source$
    .pipe(
        filter((value) => value >= 2),
        map((value) => value + 1)
    )
    .subscribe((value) => console.log("3", value));
