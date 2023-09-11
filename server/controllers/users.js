const User = require('../models/user.mode');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const register=async(req,res) => {
    console.log(req.body);
    try {
        const salt = await bcrypt.genSalt(10);
        
        const securedPassword = await bcrypt.hash(req.body.password, salt);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword,
            bookingMovies: [],
            theatreOwned: [],

        })
        res.json({status: 'ok'}) 
    } catch(err) {
        res.json({status:'error', error:'Duplicate'});
    }
}

const login=async (req,res) => {
    const user = await User.findOne({
        email: req.body.email,
    });
    if(user) {
        const password_compare = await bcrypt.compare(req.body.password, user.password);
        if(password_compare)
        {
            const token = jwt.sign({ id: user._id } ,process.env.JWT_SECRET);
            return res.json({status: 'ok', token: token, user: true});
        }
        else{
            return res.json({ user: false });
        }
    }
    else{
        return res.json({ user: false });
    }
};


const update=async (req,res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

module.exports= ({
   register,
   login,
   update
});



