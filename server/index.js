const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user.mode');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authenticate = require('./middleware/authMiddleware');
const moviesrouter=require("./routes/movies.js");
const theatrerouter = require("./routes/theatre");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));

app.use("/movie",moviesrouter);
app.use("/theatre",theatrerouter);

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
});



app.post('/api/register', async (req,res) => {
    console.log(req.body);
    try {
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword,
        })
        res.json({status: 'ok'}) 
    } catch(err) {
        res.json({status:'error', error:'Duplicate'});
    }
})
app.post('/api/login',async (req,res) => {
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
});

app.post('/api/getuser', authenticate, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
});