const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:false,
  },
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique:false,
  },
  date:{
    type: String,
    required: true,
    unique:false,
  },
  time:{
    type: String,
    required: true,
    unique:false,
  },
  amount:{
    type:Number,
    required: true,
    unique:false,
  }
  
});

module.exports = mongoose.model('Booking', bookingSchema);