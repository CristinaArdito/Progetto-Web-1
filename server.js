var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Q           = require('q');          // Q promise
var mongoose    = require('mongoose');   // models for Mongo
mongoose.Promise = require('q').Promise;

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.use(function(req, res, next){

  res.setHeader('Access-Control-Allow-Origin', '*');                                            //granted domains
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); //granted headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');             //granted http verbs
  next();
});

mongoose.connect('mongodb://admin:progettoweb2017@ds033966.mlab.com:33966/pw-db',{
  useMongoClient:true
});
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname));

// set the view engine to ejs
app.set('view engine', 'ejs');

// set the home page route
app.get('/', function(req, res) {

	// html render automatically looks in the views folder
	res.render('index');
	
});


// =======================
// API ROUTES 
// =======================
var userRoutes = require('./routes/api/user/user-index');
app.use('/api/user', userRoutes);  

var productRoutes = require('./routes/api/product/product-index');
app.use('/api/product', userRoutes);  

app.post('/login', function(req, res){
	res.write("Nome: "+req.username+" e Password: "+req.password);
	res.end();
});

app.get('/dashboard', function(req,res){
  res.redirect("/Admin/dashboard.ejs");
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});

