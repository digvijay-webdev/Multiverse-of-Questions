// middleware for verifying authToken from incoming requests
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const verifyAuthToken = (req, res, next) => {
    const authToken = req.header("authToken");
    
    if (authToken) {
        jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decryptedJWT) => {
            if (err) {
                console.log(`VerifyTokenErrorCode: 01\n${err}`);
                res.status(401).send({
                    message: "Session Expired Please Log-in Again"
                });
            } else {
                console.log(decryptedJWT);
                req.body.userToken = decryptedJWT;
                next();
            }
        });
    } else {
        next(false);
    }
}

/*
If 'userToken' is available then middleware will let the process go on otherwise it will respond with statusCode: 401
*/

module.exports = verifyAuthToken;
