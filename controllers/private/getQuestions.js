// GET ~ send user's personal questions for profile/dashboard page
const router = require("express").Router();
const question = require("../../model/questions");
const verifyAuthToken = require("../../utilities/verifyToken");

router.get("/getPersonalQuestions", verifyAuthToken, (req, res) => {
    if (req.body.userToken) {
        // if user is legit sending data
        question.find({ _uid: req.body.userToken.mongo_id })
            .then(questions => {
                res.send(questions);
            })
            .catch(err => {
                console.log(`ErrorGetPersonalQuestions:01\n${err}`);
                res.status(401).send({
                    message: "something went wrong please try again later"
                });
            });
    } else {
        // if user is not legit sending relogin message
        res.status(401).send({
            message: "Session Expired Please Log-in Again"
        });
    }
});


module.exports = router;