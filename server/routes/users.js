const express=require("express");
const router=express.Router();

const {
    register,
    login,update,getUserTheatres, getUserBooking}=require("../controllers/users.js");


    router.post("/register",register)
    router.post("/login",login);
    router.put("/update/:id",update);
    router.get('/:userId/theatres', getUserTheatres);
    router.get('/:userId/booking',getUserBooking);

    module.exports=router;