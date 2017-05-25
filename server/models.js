var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/library_database');

// Schemas
var Keywords = new mongoose.Schema({
  keyword: String
});

var Book = new mongoose.Schema({
  title: String,
  author: String,
  releaseDate: Date,
  keywords: [Keywords]
});

// Models
var BookModel = mongoose.model('Book', Book);

module.exports = {
  BookModel: BookModel
};