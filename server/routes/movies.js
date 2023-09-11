const express=require("express");
const router=express.Router();

const {
    addMovie,
    updateMovie,
    deleteMovie,
    getMovie,
    getMovies}=require("../controllers/movies.js");


router.post("/add",addMovie)
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);
router.get("/:id", getMovie);
router.get("/", getMovies);


module.exports=router;