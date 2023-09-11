const bookingSchema= require("../models/movies.js");
const Booking= require('../models/movies.js');

async function addBooking(req, res) {
    try {
        const {name,theatre,date,time,amount} = req.body;
    
          
        const newBooking = new Movie({name,theatre,date,time,amount});
    
        await newBooking.save();
    
        res.json({ message:'Booking created successfully'});
        
      } catch (error) {
        res.status(500).json({ error});
      }
}

module.exports= ({
    addBooking,
})