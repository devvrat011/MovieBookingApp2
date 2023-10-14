const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    address: {
        type: String,
        required: true,
        
    },
    region: {
        type: String,
        required: true,
      
    },
    number: {
        type: Number,
        required: true,
       
    },
    email: {
        type: String,
        required: true,
        
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
       
    },
    status:{
        type:Boolean,
        default:false,
    },
    location: {
        lat: {
          type: Number,
          required: true,
        },
        long: {
          type: Number,
          required: true,
        },
    },
    shows: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shows',
    }],
    
},
);

module.exports = mongoose.model('Theatre', theatreSchema);