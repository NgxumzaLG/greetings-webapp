const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const greetFactory = require('./greet-factory');

const app = express();
let greetings = greetFactory();

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.render("index", {
        greetUser: greetings.getMessage(),
        countNames: greetings.getCounter(),
        color: greetings.addAlertClass()
    });
});

app.post('/action', function(req, res) {

    greetings.greetMe(req.body.userName, req.body.language);

    res.redirect('/');

});

let PORT = process.env.PORT || 3010;

app.listen(PORT, function(){
    console.log('App starting on port', PORT);
});