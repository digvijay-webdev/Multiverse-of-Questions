// Post Questions Route ~ after log-in
const router = require("express").Router();
const badWordsFilter = require("bad-words");
const verifyAuthToken = require("../../utilities/verifyToken");
const User = require("../../model/user");
const Questions = require("../../model/questions");


// initialising Filter for removing bad-words from names
const Filter = new badWordsFilter()

/*
uid
question
isAnonymousPost
*/

// Post-Questions Route ~ POST
router.post("/postQuestion", verifyAuthToken, (req, res) => {
    if (req.body.userToken) {
        // checking is the question is already in the db
        Questions.findOne({ question: req.body.question })
            .then(question => {
                if (question) {
                    console.log(question);
                    res.send({
                        message: "That Question Already Exists"
                    });
                }

                // if question is not in our db... create document
                if (!question) {
                    Questions.create({ _uid: req.body.userToken.mongo_id, question: Filter.clean(req.body.question), firstName: req.body.userToken.firstName, lastName: req.body.userToken.lastName, isAnonymousPost: req.body.isAnonymousPost })
                        .then(result => {
                            console.log(result);
                            res.send({
                                message: "Question Posted Successfully"
                            });
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Something Went Wrong Please Try Again Later",
                                error: `QuestionCreateError01:\n ${err}`
                            });
                        });
                }
            })
            .catch(err => {
                res.send({
                    message: "Somthing Went Wrong Please Try Again Later",
                    error: `QuestionFindError01: ${err}`
                })
            });
    } else {
        res.status(401).send({
            message: "Session Expired Please Log-in Again"
        });
    }
});


module.exports = router;