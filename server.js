var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname));

// set the view engine to ejs
app.set('view engine', 'ejs');

// set the home page route
app.get('/', function(req, res) {

	// html render automatically looks in the views folder
	res.render('index');
	
});

/*
app.get('/login', function(req, res){
	//res.redirect('/login');
	res.render('login');
	res.end();
});
*/
app.post('/login', function(req, res){
	res.write("Nome: "+req.username+" e Password: "+req.password);
	res.end();
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});