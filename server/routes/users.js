const express=require("express");
const router=express.Router();

const {
    register,
    login,update,getUserTheatres}=require("../controllers/users.js");


    router.post("/register",register)
    router.post("/login",login);
    router.put("/update/:id",update);
    router.get('/:userId/theatres', getUserTheatres);

    module.exports=router;