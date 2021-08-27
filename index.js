const express = require('express');
const exphlbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetings = require('./greetFactory');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser')

const app = express();
const theGreetings = greetings();

const setupHandlebars = exphlbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
})
app.engine('handlebars', setupHandlebars); //configure express handlebars
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser('secretString'))
app.use(session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
//setting values
app.get('/', function (req, res) {
    res.render('index', {
        nameInput: theGreetings.getNames(),
        greet: theGreetings.greetMe(),
        namesGreeted: theGreetings.counter(),
    });
});
//Greeting and counting
app.post('/greet', function (req, res) {
    const { languages, name } = req.body
    var namesGreeted = theGreetings.counter()
    
    if (name === "" && languages === undefined) { 
        req.flash('errors', "Please enter name and select language!") 
        namesGreeted.length
    }
    else if (name === "") {

        req.flash('errors', "Please enter name!")
    } else if (name && languages === undefined) {
        req.flash('errors', "Please enter select language!")
    }
    else {
    
        var greet = theGreetings.greetMe(languages, name)
        var pushNames = theGreetings.setName(name)
        var namesGreeted = theGreetings.counter()

    }
    res.render('index', { greet, pushNames, namesGreeted })

});
//List of users
app.get('/greeted', function (req, res) {
    let list = theGreetings.getNames();
    res.render('users', { greeting: list });
})
//counter for each user
app.get('/greeted/:name', function (req, res) {
    var username = req.params.name
    let greetingsNumber = theGreetings.getNames()
    res.render('countUser', { name: username, counter: greetingsNumber[username] })
});

const PORT = process.env.PORT || 3012; // made port number configurable using an env variable

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});