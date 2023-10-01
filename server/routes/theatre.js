const express = require("express");
const router=express.Router();

const {
    addTheatre,
    getTheatre,
    deleteTheatre,
    updateTheatre,
    getTheatres,
    getTheatreShows,
    
} = require("../controllers/theatre");

router.post("/add",addTheatre);
router.put("/:id", updateTheatre);
router.delete("/:id",deleteTheatre);
router.get("/:id", getTheatre);
router.get("/",getTheatres);
router.get("/:id/shows",getTheatreShows);

module.exports = router;