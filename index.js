const express = require('express');
const exphlbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetings = require('./greetFactory');

const setupHandlebars = exphlbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
}) 

const app = express();
const theGreetings = greetings();


app.engine('handlebars', setupHandlebars); //configure express handlebars
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/', function(req, res){
    res.render('index',{
        nameInput: theGreetings.getNames(),
        greet: theGreetings.greetMe(),
        namesGreeted: theGreetings.counter(),
    });
});

app.post('/', function(req, res){
const {languages, name} = req.body
    res.render('index', {
        greet: theGreetings.greetMe(languages, name),
        pushNames: theGreetings.setName(name),
        namesGreeted: theGreetings.counter()
    })
});

const PORT = process.env.PORT || 3012; // made port number configurable using an env variable

app.listen(PORT, function(){
    console.log("App started at port", PORT)
});