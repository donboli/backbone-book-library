var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/library_database');

var Book = new mongoose.Schema({
  title: String,
  author: String,
  releaseDate: Date
});

var BookModel = mongoose.model('Book', Book);

module.exports = {
  BookModel: BookModel
};