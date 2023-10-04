const showSchema = require("../models/shows.js");
const Shows = require('../models/shows.js');

async function addShows(req, res) {
    try {
        const {showname,date,time,movie,ticketPrice,totalSeat} = req.body;
        const newShow = new Shows({showname,date,time,movie,ticketPrice,totalSeat});
        await newShow.save();
        res.json({ message:'Show added successfully',newShow});
      } catch (error) {
        res.status(500).json({ error});
        console.log(error);
      }
}

const updateShow = async (req, res, next) => {
  try {
      const updatedShow = await showSchema.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
          );
          res.status(200).json(updatedShow);
      } catch (err) {
      next(err);
  }
};

const getShows = async (req,res,next) => {
  try {
    const Show = await showSchema.find();
    res.status(200).json(Show);
  } catch(err){
    next(err);
  }
}

const getShow = async (req,res,next) => {
  try {
    const show = await showSchema.findById(req.params.id);
    res.status(200).json(show);
  }
  catch(err) {
    next(err);
  }
}

module.exports= ({
    addShows,
    getShows,
    getShow,
    updateShow,
})
