// signing-up/registration only
const config = require("express").Router();
const badWordsFilter = require("bad-words");
const bcrypt = require("bcryptjs");
const User = require("../model/user");


// initialising Filter for removing bad-words from names
const Filter = new badWordsFilter();

// Signup Route ~ POST
config.post("/auth/signup", (req, res) => {
    User.create({
        firstName: Filter.clean(req.body.firstName),
        lastName: Filter.clean(req.body.lastName),
        email: req.body.email,
        securityQuestion: req.body.securityQuestion,
        password: bcrypt.hashSync(req.body.password.trim(), 10)
    })
        .then(data => {
            res.send({ message: "Please check your inbox to get started" });
        })
        .catch(err => {
            // finding duplicate users 
            if (err.code === 11000) return res.send({ message: "email is already taken" });

            // if incoming JSON is not proper OR somthing else happend
            res.send(err.errors);
        });
});


module.exports = config;