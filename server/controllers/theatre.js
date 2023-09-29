const theatreSchema = require("../models/theatre.js");
const Theatre = require('../models/theatre.js');

async function addTheatre(req, res) {
    try {
        const {name,address,number,email} = req.body;
        const existingTheatre = await Theatre.findOne({name});
        if (existingTheatre){
            return res.status(409).json({ error: 'Theatre already exists' });
        }
        const newTheatre = new Theatre({name,address,number,email});
        await newTheatre.save();
        res.json({ message:'Theatre created successfully',newTheatre});
    } catch (error) {
        res.status(500).json({ error});
    }
}


const updateTheatre = async (req, res, next) => {
    try {
        const updatedTheatre = await theatreSchema.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
            );
            res.status(200).json(updatedTheatre);
        } catch (err) {
        next(err);
    }
};

const deleteTheatre = async (req, res, next) => {
    try {
        await theatreSchema.findByIdAndDelete(req.params.id);
        res.status(200).json("Theatre has been deleted.");
    } catch (err) {
        next(err);
    }
};

const getTheatre = async (req, res, next) => {
    try {
        const Theatre = await theatreSchema.findById(req.params.id);
        res.status(200).json(Theatre);
    } catch (err) {
        next(err);
    }
};

const getTheatres = async (req, res, next) => {
    try {
        const Theatre = await theatreSchema.find();
        res.status(200).json(Theatre);
    } catch (err) {
        next(err);
    }
};

const getTheatreShows = async (req,res) => {
    try {
        
        const theatreId = req.params.id;
        
        const theatre = await theatreSchema.findById(theatreId).populate('shows');
     
        if(!theatre){
            return res.status(404).json({ error: 'theatre not found' });
        }
        const ShowsOwned = theatre.shows;
        res.status(200).json({ ShowsOwned });
    }
    catch(err) {
        res.status(500).json({ error: 'Error fetching theaters' });
    }
}


// const getUserTheatres = async (req, res) => {
//     try {
//         const userId = req.params.userId; 
//         const user = await User.findById(userId).populate('theatreOwned');   
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         const theatersOwned = user.theatreOwned;
//         res.status(200).json({ theatersOwned });
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching user theaters' });
//     }
// };

module.exports= ({
    addTheatre,
    getTheatre,
    getTheatres,
    updateTheatre,
    deleteTheatre,
    getTheatreShows,
});