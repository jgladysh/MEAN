var mongoose = require('mongoose');

// define event model
module.exports = mongoose.model('Event', {
    title: String,
    start: String,
    end: String
});
