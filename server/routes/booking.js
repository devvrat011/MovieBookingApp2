const express=require("express");
const { addBooking } = require("../controllers/booking");
const router=express.Router();

router.post("/add",addBooking);

module.exports=router;