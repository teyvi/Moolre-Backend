const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require('./src/config/mongooseConfig');
const Routes = require('./src/routes/routesMoorle');

//connect db
connectDB();
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//routes
app.use("/api/moorle", Routes);

//PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
