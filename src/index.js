const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//routes
const postRoute = require('./routes/posts');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile')

//DB connect 
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () =>{
        console.log("Connected to DB");
})

const app = express();


//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/user' , authRoute);
app.use('/api/posts', postRoute);
app.use('/api/user', profileRoute);

app.listen(6969, () => console.log("Ayy Ayy captain"));


//mongodb+srv://madrix:<password>@cluster0.kdbs1.mongodb.net/<dbname>?retryWrites=true&w=majority
