var app = app || {};

app.LibraryView = Backbone.View.extend({
  el: '#books',

  events: {
    'click #add': 'addBook'
  },

  initialize: function(initialBooks) {
    this.collection = new app.Library(initialBooks);

    this.listenTo(this.collection, 'add', this.renderBook);

    this.render();
  },

  render: function() {
    this.collection.each(function(item) {
      this.renderBook(item);
    }, this);
  },

  renderBook: function(item) {
    var bookView = new app.BookView({
      model: item
    });
    this.$el.append(bookView.render().el);
  },

  addBook: function(e) {
    e.preventDefault();

    var formData = {};

    $('#addBook div').children('input').each(function(i, el) {
      var data = $(el).val().trim();

      if (data !== '') {
        formData[el.id] = data;
      }
    });

    this.collection.add(new app.Book(formData));
  }
});