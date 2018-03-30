var express = require("express");
var path = require("path");
var zipdb = require("zippity-do-dah");
var ForecastIo = require("forecastio");

// create an Express aplication
var app = express();
// create an ForecastIO object with API key
var weather = new ForecastIo("75c708070171d2095af2bebb6a88497a");

// serves static files out of public
app.use(express.static(path.resolve(__dirname,"public")));

// use EJS as the view enginem, and serves the views out of a views folder
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");


// rendre the index view if you hit the homepage
app.get("/", (req,res) => {
    res.render("index");
});

// capture the specific ZIP Code and passes it as req.params[0]
app.get(/^\/(\d{5})$/, (req, res, next) => {
    var zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);
    if(!location.zipcode) {
        next();
        return;
    }

    var latitude = location.latitude;
    var longitude = location.longitude;

    weather.forecast(latitude, longitude, (err, data) =>{
        if(err) {
            next();
            return;
        }
        res.json({
            zipcode: zipcode,
            temperature: data.currently.temperature
        });
    });
});

app.use((req, res) => {
    res.status(404).send("404");
});

app.listen(3000, () => {
    console.log("Server has started on port 3000.");
});