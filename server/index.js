const express=require("express");
const dotenv =require("dotenv");
const mongoose=require("mongoose");
const cors=require("cors");
const moviesrouter=require("./routes/movies.js");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())


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

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
});
