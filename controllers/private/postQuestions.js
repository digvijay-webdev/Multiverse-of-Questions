// Post Questions Route ~ after log-in
const router = require("express").Router();
const badWordsFilter = require("bad-words");
const verifyAuthToken = require("../../utilities/verifyToken");
const User = require("../../model/user");
const Questions = require("../../model/questions");


// initialising Filter for removing bad-words from names
const Filter = new badWordsFilter();

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
                    Questions.create({ _uid: req.body.userToken.mongo_id, question: Filter.clean(req.body.question.trim()), explanation: Filter.clean(req.body.explanation.trim()), firstName: req.body.userToken.firstName, lastName: req.body.userToken.lastName, isAnonymousPost: req.body.isAnonymousPost })
                        .then(result => {
                            console.log("New Question Posted..");
                            res.send({
                                message: "Question Posted Successfully"
                            });
                        })
                        .catch(err => {
                            console.log("ERROR: 01 POST-Question\n" + err);
                            res.status(500).send({
                                // E11000 - duplicate error
                                message: "That Question or Explation is already posted by someone.",
                                error: `QuestionCreateError01:\n ${err}`
                            });
                        });
                }
            })
            .catch(err => {
                res.send({
                    message: "Somthing Went Wrong Please Try Again Later",
                    error: `QuestionFindError02:\n ${err}`
                });
            });
    } else {
        res.status(401).send({
            message: "Session Expired Please Log-in Again"
        });
    }
});


module.exports = router;