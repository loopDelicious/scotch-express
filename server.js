// https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
// https://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm

// BASE SETUP
// ==============================================

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

// ROUTES
// ==============================================

app.route('/login')

//  show the form (GET http://localhost:8080/login)
  .get(function(req, res) {
    res.send('this is the login form');
  })

//  process the form (POST http://localhost:8080/login)
  .post(function(req, res) {
    console.log('processing');
    res.send('processing the login form@');
  });

// sample route
app.get('/sample', function(req, res) {
  res.send('this is a sample!');
});

// get an instance of a router
var router = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

// home page route (http://localhost: 8080)
router.get('/', function(req, res) {
  res.send('im the home page!');
});

// about page route (http://localhost:8080/about)
router.get('/about/:name', function(req, res) {
  res.send('im the about page!');
});

// route middleware to validate :name
router.param('name', function(req, res, next, name) {
  console.log('doing name validations on ' + name);
  req.name = name;
  next();
});

// route with parameters (http://localhost:8080/hello/:name)
router.get('/hello/:name', function(req, res) {
  res.send('hello ' + req.params.name + '!');
});

// apply the routes to our application
app.use('/', router);

// server static files
app.use(express.static('public'));
app.get('/index.html', function(req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

app.get('/process_get', function(req, res) {
  response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
});


// START THE SERVER
// ==============================================

app.listen(port);
console.log('Magic happens on port ' + port);