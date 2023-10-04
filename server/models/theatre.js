const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
        unique: true,
    },
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    status:{
        type:Boolean,
        default:false,
    },
    shows: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shows',
    }],
    
},
);

module.exports = mongoose.model('Theatre', theatreSchema);