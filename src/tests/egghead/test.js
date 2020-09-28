const { Observable } = require("rxjs");

const source = Observable.create((observer) => {
    const id = setTimeout(function () {
        try {
            observer.next(42);
            throw "my bad error";
            observer.complete();
        } catch (error) {
            observer.error(error);
        }
    });

    return function () {
        console.log("diposal called");
        clearTimeout(id);
    };
});

const sub = source.subscribe(
    (data) => console.log("next " + data),
    (err) => console.log(err),
    () => console.log("done")
);

// disposal is automatically called on error

// sub.dispose()
