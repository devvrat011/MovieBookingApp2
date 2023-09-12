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
module.exports= ({
    addTheatre,
    getTheatre,
    getTheatres,
    updateTheatre,
    deleteTheatre,
});