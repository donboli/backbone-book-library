var app = app || {};

app.Book = Backbone.Model.extend({
  defaults: {
    coverImage: 'img/placeholder.png',
    title: 'No title',
    author: 'Unknown',
    keywords: []
  },

  parse: function function_name(response) {
    response.id = response._id;
    return response;
  }
});