var mongoose = require('mongoose');

var db = mongoose.connection;

db.once('open', function() {
  var Slide = mongoose.model('Slide', {
    url: String,
    title: String
  });
});