require('events').EventEmitter.defaultMaxListeners = 20;


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors =require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/config');
const employeeRoutes = require('./backend/routes/employees');
const errorHandler = require('./backend/middleware/errorHandler');
const authRouter = require('./backend/routes/auth');


const app = express();
app.use(cors({
    origin: 'http://localhost:3002'
  }));

app.use(express.json());
connectDB();

const PORT = 3000;

app.get("/",(req,res) => {
    res.send("hello world");
})


app.use('/api/auth', authRouter);
app.use('/api', employeeRoutes);

app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("databse connected")
    app.listen(process.env.PORT|| PORT, () => {
        console.log("Server is running on port")
    })
})

