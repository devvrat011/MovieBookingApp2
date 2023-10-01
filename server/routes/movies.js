const express=require("express");
const router=express.Router();

const {
    addMovie,
    updateMovie,
    deleteMovie,
    getMovie,
    getMovieTheatres,
    getMovies}=require("../controllers/movies.js");

router.post("/add",addMovie)
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);
router.get("/:id", getMovie);
router.get("/", getMovies);
router.get("/:id/theatres",getMovieTheatres);
module.exports=router;