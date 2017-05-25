module.exports = function(models) {
  var routes = require('express').Router();
  var BookModel = models.BookModel;

  // Routes
  routes.get('/api', function(request, response) {
    response.send('Library API is running');
  });

  // index
  routes.get('/api/books', function(request, response) {
    return BookModel.find(function(err, books) {
      if (!err) {
        return response.send(books);
      } else {
        console.log(err);
        return response.status(404).end();
      }
    });
  });

  // create
  routes.post('/api/books', function(request, response) {
    var book = new BookModel({
      title: request.body.title,
      author: request.body.author,
      releaseDate: request.body.releaseDate,
      keywords: request.body.keywords
    });

    return book.save(function(err) {
      if (!err) {
        console.log('created');
        return response.send(book);
      } else {
        console.log(err);
        return response.status(422).end();
      }
    });
  });

  // show
  routes.get('/api/books/:id', function(request, response) {
    return BookModel.findById(request.params.id, function(err, book) {
      if (!err) {
        return response.send(book);
      } else {
        console.log(err);
        return response.status(404).end();
      }
    });
  });

  // update
  routes.put('/api/books/:id', function(request, response) {
    return BookModel.findByIdAndUpdate(request.params.id, {$set: request.body}, function(err, book) {
      if (!err) {
        console.log('book updated');
        return response.send(book);
      } else {
        console.log(err);
        return response.status(404).end();
      }
    });
  });

  // destroy
  routes.delete('/api/books/:id', function(request, response) {
    return BookModel.findById(request.params.id, function(err, book) {
      if (!err && book) {
        book.remove(function(err) {
          if (!err) {
            console.log('book removed');
            return response.status(200).end();
          } else {
            console.log(err);
            return response.status(404).end();
          }
        });
      } else {
        console.log(err || 'book not found');
        return response.status(404).end();
      }
    });
  });

  return routes;
};