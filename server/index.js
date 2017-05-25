var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    mongoose = require('mongoose');

var app = express();

// DB
mongoose.connect('mongodb://localhost/library_database');

var Book = new mongoose.Schema({
  title: String,
  author: String,
  releaseDate: Date
});

var BookModel = mongoose.model('Book', Book);

var routes = require('./routes')(BookModel);

var port = 4711;

// Config
app.use(bodyParser.json());
app.use(methodOverride());
app.use(routes);
app.use(express.static(path.join(application_root, '../../', 'site')));
app.use(errorHandler({dumpExceptions: true, showStack: true}));


// Startup
app.listen(port, function() {
  console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});