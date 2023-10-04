const express=require("express");
const { addShows,getShows,getShow, updateShow } = require("../controllers/shows");
const router=express.Router();

router.post("/add",addShows);
router.get("/",getShows);
router.get("/:id",getShow);
router.put("/:id",updateShow);

module.exports=router;