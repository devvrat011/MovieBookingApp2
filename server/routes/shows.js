const express=require("express");
const { addShows,getShows,getShow } = require("../controllers/shows");
const router=express.Router();

router.post("/add",addShows);
router.get("/",getShows);
router.get("/:id",getShow);

module.exports=router;