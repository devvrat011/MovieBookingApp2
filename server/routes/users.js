const express=require("express");
const router=express.Router();
const { body, validationResult } = require('express-validator');
const {
    register,
    login,update,getUserTheatres, getUserBooking}=require("../controllers/users.js");


    router.post("/register",[ body('email', 'Email should be a valid email').isEmail()],register)
    router.post("/login",[ body('email', 'Email should be a valid email').isEmail()],login);
   
    router.put("/update/:id",update);
    router.get('/:userId/theatres', getUserTheatres);
    router.get('/:userId/booking',getUserBooking);

    module.exports=router;