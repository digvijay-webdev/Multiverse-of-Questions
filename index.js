// MAIN FILE

// npm modules
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// core node modules
const os = require("os");

// custom modules
const signupConfig = require("./config/signup");
const loginConfig = require("./config/login");
const postQuestions = require("./controllers/private/postQuestions");
const getAllQuestions = require("./controllers/public/getAllQuestions");
const getPersonalQuestions = require("./controllers/private/getQuestions");
const deleteQuestions = require("./controllers/private/deleteQuestion");

// utilities
const clusterise = require("./utilities/clusterise");

// express app initialised
const app = express();

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors());

// auth configuration
app.use(signupConfig);
app.use(loginConfig);

// controllers
app.use("/private", postQuestions);
app.use("/private", getPersonalQuestions);
app.use("/public", getAllQuestions);
app.use("/private", deleteQuestions);

// clusterising + port config + starting + connecting to DB
const numOfCPUs = os.cpus().length;
const port = process.env.PORT || process.env.LOCAL_SERVER_PORT;

mongoose.connect(process.env.ATLAS_CONNECTION_URI, {
    useUnifiedTopology: true
})
    .then(() => clusterise(port, numOfCPUs, app))
    .catch(err => console.log(`FAILED TO CONNECT WITH ATLAS:\n${err}`));
 


