const bookingSchema= require("../models/booking.js");
const Booking= require('../models/booking.js');

async function addBooking(req, res) {
    try {
        const {name,theatre,date,time,amount,seats} = req.body;
        const newBooking = new Booking({name,theatre,date,time,amount,seats});
        await newBooking.save();
        res.json({ message:'Booking created successfully'});
      } catch (error) {
        res.status(500).json({ error});
        console.log(error);
      }
}

module.exports= ({
    addBooking,
})