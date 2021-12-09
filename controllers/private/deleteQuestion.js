// DELETE ~ a single question\
// redirect options for client specified to help client-side authentication
// require token verification

const router = require("express").Router();
const verifyAuthToken = require("../../utilities/verifyToken");
const Questions = require("../../model/questions");



router.delete("/deleteQuestion", verifyAuthToken, (req, res) => {
    // if JWT is verified
    if (req.body.userToken) {
        // checking question_id property
        if (req.body.question_id) {
            Questions.findById({ _id: req.body.question_id })
                .then(question => {
                    // verifying that the same user is making delete request who posted the question
                    if (req.body.userToken.mongo_id === question._uid) {
                        // performing delete operation
                        Questions.findByIdAndDelete({ _id: req.body.question_id })
                            .then(success => {
                                res.send({
                                    message: "Question Deleted Successfully",
                                    redirectOption: true
                                });
                            })
                            .catch(err => {
                                res.send({
                                    message: "Unable to process your request please try again later",
                                    redirectOption: false,
                                    code: "DELQUE01"
                                });
                            });
                    } else {
                        res.status(405).send({
                            message: "Unauthorised request denied"
                        });
                    }
                })
                .catch(err => {
                    res.send({
                        message: "Invalid request token please try again"
                    });
                });
        } else {
            res.send({
                message: "Question not specified"
            });
        }
        
    } else {
        // if JWT is not verified
        res.status(401).send({
            message: "Session Expired Please Log-in Again"
        });
    }
});


module.exports = router;