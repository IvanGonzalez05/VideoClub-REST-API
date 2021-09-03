// the goal of this function is to catch asynchronous errors
// So,it receives a function
module.exports = (fn) => {
    // then I'm returning a function which takes the req, res and next args
    // and then execute the function pass from args with the req, res, next
    // Since the function that we use here is intended to be asynchronous
    // it returns a promise, so if something goes wrong, I just need to catch
    // the error.
    return (req, res, next) => {
        fn(req, res, next).catch(next);
        // fn(req, res, next).catch(error => next(error)); // this works too, the other is a shortcut
    };
};
