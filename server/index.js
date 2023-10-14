const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user.mode');

const authenticate = require('./middleware/authMiddleware');
const moviesrouter=require("./routes/movies.js");
const theatrerouter = require("./routes/theatre");

const usersrouter=require("./routes/users.js");
const bookingrouter=require("./routes/booking.js");
const showrouter = require("./routes/shows");
const stateRouter=require("./routes/stateLoc")
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

app.use("/show",showrouter);

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
});

app.use('/api',usersrouter);

app.use('/booking',bookingrouter);

app.use('/state',stateRouter);

app.post('/api/getuser', authenticate, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
});