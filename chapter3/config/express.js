

// This grabs all of the required nodes for the project
var express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');


module.exports = function() {

	var app = express();


	// THis will chage the if we use moprgan module or compress moule for production
	if(process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	// This will use the body-parser for rendering file types 
	app.use(bodyParser.urlencoded ({
		extended: true

	})); // end bodyParser

	app.use(bodyParser.json());
	app.use(methodOverride());

	// THis is going ot set up the view with EJS templeting engine
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	// THis grabs the routes file for bring over controller files
	require('../app/routes/index.server.routes.js')(app);

	return app;
}