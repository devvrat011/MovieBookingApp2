const movieSchema= require("../models/movies.js");
const Movie= require('../models/movies.js');

async function addMovie(req, res) {
    try {
      const {name,description,duration,language,date,genre,url} = req.body;
      const existingMovie = await Movie.findOne({name});
      if (existingMovie) {
        return res.status(409).json({ error: 'Movie already exists' });
      }
      const newMovie = new Movie({name,description,duration,language,date,genre,url});
      await newMovie.save();
      res.json({ message:'Movie created successfully'});
    } catch (error) {
        console.log(error);
      res.status(500).json({ error});
    }
  }

const updateMovie = async (req, res, next) => {
    try {
        const updatedMovie = await movieSchema.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedMovie);
    } catch (err) {
        next(err);
    }
};

const deleteMovie = async (req, res, next) => {
    try {
        await movieSchema.findByIdAndDelete(req.params.id);
        res.status(200).json("Movie has been deleted.");
    } catch (err) {
        next(err);
    }
};

const getMovie = async (req, res, next) => {
    try {
        const Movie = await movieSchema.findById(req.params.id);
        res.status(200).json(Movie);
    } catch (err) {
        next(err);
    }
};

const getMovies = async (req, res, next) => {
    try {
        const Movie = await movieSchema.find();
        res.status(200).json(Movie);
    } catch (err) {
        next(err);
    }
};

module.exports= ({
    addMovie,
    updateMovie,
    getMovie,
    getMovies,
    deleteMovie
});
