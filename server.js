var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var path = require('path');
var db = require('./back/models');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var morgan = require('morgan');



// const SequelizeStore = require('connect-session-sequelize')(session.Store);
//dotenv to store env keys
require('./passport.js')(passport);
//sequelize an
app.use(bodyparser.urlencoded({ extended: false, }));
app.use(bodyparser.json());
app.use(express.static('front/public'));
app.use('/userphotos', express.static('front/public/userphotos'));

//passport midleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(flash());
app.use(session({
	secret: 'wanderly wander',
	resave: false,
	saveUninitialized: true,
	// store: new SequelizeStore({
 //    	db: db.sequelize,
 //    	 table: 'Session'
 // 	})
}));
app.use(passport.initialize());
app.use(passport.session());

//route for users is not api
require('./back/routes/user-router.js')(app, passport);

app.use('/api', require('./back/routes'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/front/views/index.html'));
});

const port = process.env.PORT || 3000

db.sequelize.sync().then(function () {
  app.listen(port, () => console.log('Server running on Port ' + port));
});

module.exports = app;
