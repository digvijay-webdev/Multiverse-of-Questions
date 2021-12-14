// security question incase of password edit
const config = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");



// Log-in Route ~ POST
config.post("/auth/login", (req, res) => {
    // looking if the user with requested email exists
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                if (user.isVerified) {
                    // compare password + issue JWT Token
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        jwt.sign({
                            firstName: user.firstName,
                            lastName: user.lastName,
                            mongo_id: user._id
                        }, process.env.JWT_SECRET_KEY, {
                            expiresIn: "1h"
                        }, (err, encode) => {
                            if (err) {
                                // if error occurred
                                console.log(`CustomErrorCode: LOGIN01... \n${err}`);
                                res.send("Unable to process your request at the moment please try again later");
                            } else {
                                // if jwt token created successfuly, sent to client
                                res.send({
                                    message: {
                                        first: user.firstName,
                                        last: user.lastName
                                    },
                                    token: encode
                                });
                            }
                        });
                    } else {
                        // if password does not match
                        res.send({
                            message: "Please, Enter the correct password"
                        });
                    }
                } else {
                    // if not verified 
                    res.send({
                        message: "Please, verify your email to continue"
                    });
                }
            } else {
                res.send({
                    message: `User with Email: ${req.body.email} does not exists`
                });
            }
        })
        .catch(err => {
            res.send({
                message: "Email & Password is required",
                argumentError: err
            });
        });
});


module.exports = config;