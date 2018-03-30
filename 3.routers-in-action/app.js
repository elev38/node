var express = require("express");
var path = require("path");
var apiRouter = require("./routes/api-router");
var logger = require("morgan");

var app = express();

var staticPath = path.join(__dirname, "static");
app.use(express.static(staticPath));

app.use(logger("short"));

app.get("/", (req, res) => {
    res.send("This is GET /root");
});

app.use("/api", apiRouter);

app.listen(3000, ()=>{
    console.log("Server has started at port 3000");
});