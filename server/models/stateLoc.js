const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:false,
  },
  theatres: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Theatre',
  }],
  
});

module.exports = mongoose.model('StateLoc', stateSchema);