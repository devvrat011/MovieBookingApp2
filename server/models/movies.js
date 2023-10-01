const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description:{
    type: String,
    required: true,
  },
  duration: {
    type:Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required:true,
  },
  url: {
    type: String,
    required:true,
  },
  theatres: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Theatre',
  }],
  
});

module.exports = mongoose.model('Movie', movieSchema);