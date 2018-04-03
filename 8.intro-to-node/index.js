var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();

// view engines
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static path
app.use(express.static(path.join(__dirname, 'public')))

var user = [
    {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'email@gmail.com'
    },
    {
        id: 2,
        first_name: 'Marta',
        last_name: 'Sally',
        email: 'liame@gmail.com'
    }
]

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Customer',
        user: user
    });
});

app.post('/users/add', (req,res) => {
    var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    };

    user.push(newUser);
});

app.listen(3000, function(){
    console.log('Server has started at port 3000 ... ');
});