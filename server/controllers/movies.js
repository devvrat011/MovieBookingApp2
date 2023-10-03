const movieSchema = require("../models/movies.js");
const Movie = require('../models/movies.js');

async function addMovie(req, res) {
  try {
    const { name, description, duration, language, date, genre, url } = req.body;
    const existingMovie = await Movie.findOne({ name });
    if (existingMovie) {
      return res.status(409).json({ error: 'Movie already exists' });
    }
    const newMovie = new Movie({ name, description, duration, language, date, genre, url });
    await newMovie.save();
    res.json({
      message: 'Movie created successfully',
      newMovie
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
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


const formatDate=(date)=>{
  const options = {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  };

  const formattedDateParts = new Intl.DateTimeFormat('en-US', options).formatToParts(date);

  const formattedDate = formattedDateParts
    .filter(part => part.type !== 'literal')
    .map(part => part.value)
    .join(' ');
    return formattedDate;
}

const getMovieTheatres = async (req, res) => {
  try {
    const movieId = req.params.id;
    const queryDate = req.query.date;

    const movie = await movieSchema
      .findById(movieId)
      .populate({
        path: 'theatres',
        populate: {
          path: 'shows',
        },
      });

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const TheatresOwned = movie.theatres;

    const filteredTheatresOwned = TheatresOwned.map((theatre) => ({
      ...theatre.toObject(),
      shows: theatre.shows.filter((show) => {
        // Convert the show date to the same format as the query date
        const formattedShowDate = formatDate(new Date(show.date));
        return show.movie.id.toString() === movieId && formattedShowDate === queryDate;
      }),
    }));

    res.status(200).json({ TheatresOwned: filteredTheatresOwned });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching Movies' });
  }
};

module.exports = ({
  addMovie,
  updateMovie,
  getMovie,
  getMovies,
  deleteMovie,
  getMovieTheatres
});
// &&(formatDate(new Date(date))===formatDate(show.date))
