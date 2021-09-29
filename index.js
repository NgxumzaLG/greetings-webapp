const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const {Pool} = require('pg');


const greetFactory = require('./greet-factory');
const greetRoutes = require('./routes/greet-routes');

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
	useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings';

const pool = new Pool({
	connectionString,
	ssl : {
		rejectUnauthorized:false
	}
});

const app = express();
let greetings = greetFactory(pool);
let routeGreetings = greetRoutes(greetings);

const handlebarSetup = exphbs({
	partialsDir: './views/partials',
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

// initialise session middleware - flash-express depends on it
app.use(session({
	secret : 'flash the mesaage',
	resave: false,
	saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.get('/', routeGreetings.defualtRoute);

app.post('/action', routeGreetings.actionRoute);

app.get('/greeted', routeGreetings.greetedRoute);

app.get('/summary/:username', routeGreetings.summaryRoute);

app.post('/reset', routeGreetings.resetRoute);

let PORT = process.env.PORT || 3010;

app.listen(PORT, function(){
	console.log('App starting on port', PORT);

});