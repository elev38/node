// require the modules we will need
var express = require("express");
var path = require("path");
var fs = require("fs");
var morgan = require("morgan");

// create ab Express application and puts it inside the app variable
var app = express();

// log all incoming requests
app.use(morgan("short"));

// static file middleware
app.use((req, res, next) => {
    // use path.join to find the path where the file should be
    var filePath = path.join(__dirname, "static", req.url);
    // fs.stat gets info about file
    fs.stat(filePath, (error, fileInfo) => {
        // if fs.stat fails, continue to the next middleware
        if(error) {
            next();
            return;
        }
        // if file exists call res.sendFile
        if(fileInfo.isFile()){
            res.sendFile(filePath);
        // otherwise continue to the next middleware
        } else {
            next();
        }
    });
});

// the 404 handler
app.use((req, res) => {
    res.status(404);
    res.send("File not found");
});

// starts the app on port 3000
app.listen(3000, () => {
    console.log("Server has started on port 3000!");
});