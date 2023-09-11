const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  date:{
    type: String,
    required: true,
  },
  time:{
    type: String,
    required: true,
  },
  amount:{
    type:Number,
    required: true,
  }
  
  
});

module.exports = mongoose.model('Booking', bookingSchema);