const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  showname: {
    type: String,
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
  movie:{
    type: String,
    required: true,
    unique:false,
  },
  ticketPrice: {
    type: Number,
    required:true,
    unique:false,
  },
  totalSeat: {
    type: Number,
    required:true,
    unique:false,
  },
});

module.exports = mongoose.model('Shows', showSchema);