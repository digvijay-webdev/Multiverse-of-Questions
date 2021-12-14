// this route is only for hitting verification link
const config = require("express").Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");

config.get("/verifyEmail/:token", (req, res) => {
    // bringing token back in real format
    const token = req.params.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decryptedToken) => {
            if (err) {
                res.send({
                    message: "Unable to verify your account, please try later",
                    error: err,
                    code: "CONFIG-EV-01"
                });
            } else {
                User.findByIdAndUpdate({ _id: decryptedToken.uid }, { isVerified: true })
                    .then(user => {
                        if (user) {
                            // on successful update
                            res.send( "Email Verified Successfully, now you can log-in");
                        } else {
                            res.send({
                                message: "Unknown error occurred, please try later",
                                code: "CONFIG-EV-02",
                                redirectOption: false
                            });
                        }
                    })
                    .catch(err => {
                        console.log(`ErrorVerifyEmail: 01\n${err}`);
                        res.send({
                            message: "Unable to find your account, please try to register",
                            error: err,
                            code: "CONFIG-EV-03"
                        });
                    });
            }
        });
    }
});


module.exports = config;