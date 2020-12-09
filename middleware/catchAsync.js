export default (func) => (req, res, next) => {
    console.log("something");
    Promise.resolve(func(req, res, next)).catch(next);

};