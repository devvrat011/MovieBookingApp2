const stateSchema = require("../models/stateLoc");
const StateLoc = require('../models/stateLoc');

async function addState(req, res) {
  try {
      const {name} = req.body;
      const newState = new StateLoc({name});
      await newState.save();
      res.json({ message:'State added successfully',newState});
    } catch (error) {
      res.status(500).json({ error});
      console.log(error);
    }
}

const updateState = async (req, res, next) => {
try {
    const updatedState = await stateSchema.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
        );
        res.status(200).json(updatedState);
    } catch (err) {
    next(err);
}
};

const getStates = async (req,res,next) => {
try {
  const state = await stateSchema.find();
  res.status(200).json(state);
} catch(err){
  next(err);
}
}

const getState = async (req,res,next) => {
try {
  const state = await stateSchema.findById(req.params.id);
  res.status(200).json(state);
}
catch(err) {
  next(err);
}
}


const getStateTheatres = async (req,res) => {
  try {
      const stateId = req.params.id;
      const state = await stateSchema.findById(stateId).populate('theatres');
      if(!state){
          return res.status(404).json({ error: 'state not found' });
      }
      const TheatreOwned = state.theatres;
      res.status(200).json({TheatreOwned });
  }
  catch(err) {
      res.status(500).json({ error: 'Error fetching State' });
  }
}
module.exports= ({
    addState,
    updateState,
    getState,
    getStates,
    updateState,
    getStateTheatres
})
