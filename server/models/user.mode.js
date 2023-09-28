const mongoose = require('mongoose');

const User = new mongoose.Schema( {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    quote: {type: String},
    bookingMovies: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    theatreOwned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Theatre',
    }],
},
{collection: 'user-data'}
)

const model = mongoose.model('User-data',User)

module.exports = model;