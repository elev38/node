var express = require("express");
var ALLOWED_IPS = [
    "127.0.0.1",
    "123.456.7.89"
];

var api = express.Router();

api.use((req, res, next) => {
    var userIsAllowed = ALLOWED_IPS.indexOf(req.ip) !== -1;
    if (userIsAllowed) {
        res.status(401).send("Not autorized!");
    } else {
        next();
    }
});

api.get("/users", (req, res) => {
    console.log("This is GET /api");
    res.send("This is GET /api");
});

api.post("/user", (req, res) => {
    console.log("This is POST /api");
    res.send("This is PSOT /api");
});

module.exports = api;