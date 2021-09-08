const express = require('express');
const exphlbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetings = require('./greetFactory');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const pg = require("pg");
const Pool = pg.Pool;

const app = express();

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

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/my_users';
;
console.log(connectionString);

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const theGreetings = greetings(pool);

//setting values
app.get('/', async function (req, res) {
    res.render('index', {
        nameInput: theGreetings.getNames(),
        greet: await theGreetings.greetMe(),
        namesGreeted: await theGreetings.counter()
    });
});
//Greeting and counting
app.post('/greet', async function (req, res) {
    const { languages, name } = req.body
    var namesGreeted = await theGreetings.counter()
    
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
    
        var greet = await theGreetings.greetMe(languages, name)
        var pushNames = theGreetings.setName(name)
        var namesGreeted = await theGreetings.counter()

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
//reset counter
app.post('/reset', async function (req, res){
     await theGreetings.resetCounter()
     res.redirect('/') 
})

const PORT = process.env.PORT || 3012; // made port number configurable using an env variable

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});