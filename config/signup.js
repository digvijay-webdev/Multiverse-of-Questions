// signing-up/registration only
const config = require("express").Router();
const badWordsFilter = require("bad-words");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const verifyAccountMail = require("../utilities/verifyAcEmail");


// initialising Filter for removing bad-words from names
const Filter = new badWordsFilter();

// Signup Route ~ POST
config.post("/auth/signup", (req, res) => {
    console.log(req.body);
    User.create({
        firstName: Filter.clean(req.body.firstName),
        lastName: Filter.clean(req.body.lastName),
        email: req.body.email,
        securityQuestion: req.body.securityQuestion,
        password: bcrypt.hashSync(req.body.password.trim(), 10)
    })
        .then(data => {
            // sign-verification token
            jwt.sign({
                uid: data._id
            }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" }, (err, encode) => {
                if (err) {
                    res.send({
                        message: "Unable to process your request please try later",
                        code: "AUTHS"
                    });
                } else {
                    // sending verification email
                    let url = `${process.env.URL_FOR_EMAIL_VERIFICATION}/verifyEmail/` + encode;
                    verifyAccountMail(data.email, "Verify Your Account To Get Started", data.firstName, url)
                        .then(success => {
                            console.log(url);
                            res.send({ message: "Please check your inbox to get started" });
                        })
                        .catch(err => {
                            console.log("Error: /signup - mailer\n" + err);
                            res.send({
                                message: "Unable to send verification email please try later"
                            });
                        });
                }
            });
        })
        .catch(err => {
            // finding duplicate users 
            if (err.code === 11000) return res.send({ message: "email is already taken" });

            // if incoming JSON is not proper OR somthing else happend
            res.send(err.errors);
        });
});


module.exports = config;