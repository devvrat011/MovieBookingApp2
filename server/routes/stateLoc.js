const express=require("express");
const { addState,getStates,getState, updateState, getStateTheatres } = require("../controllers/stateLoc");
const router=express.Router();

router.post("/add",addState);
router.get("/",getStates);
router.get("/:id",getState);
router.put("/:id",updateState);
router.get("/:id/theatre",getStateTheatres);
module.exports=router;