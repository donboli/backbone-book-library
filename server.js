var application_root = __dirname,
    express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoose = require('mongoose');

var app = express();

var port = 4711;

// DB
mongoose.connect('mongodb://localhost/library_database');

var Book = new mongoose.Schema({
  title: String,
  author: String,
  releaseDate: Date
});

var BookModel = mongoose.model('Book', Book);

// Routes
app.get('/api', function(request, response) {
  response.send('Library API is running');
});

app.get('/api/books', function(request, response) {
  return BookModel.find(function(err, books) {
    if (!err) {
      return response.send(books);
    } else {
      return console.log(err);
    }
  });
});

// Config
app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, '../', 'site')));
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

// Startup
app.listen(port, function() {
  console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});