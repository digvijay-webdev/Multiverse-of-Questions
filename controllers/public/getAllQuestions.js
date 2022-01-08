// GET ~ send all the questions 
// filter out the names where isAnonymou(sPost is true
const router = require("express").Router();
const question = require("../../model/questions");


router.get("/getAllQuestions", (req, res) => {
    question.find()
        .then(questions => {
            const filteredAnonymousQuestions = questions.map(question => {
                if (question.isAnonymousPost) {
                    return {
                        _id: question._id,
                        _uid: question._uid,
                        firstName: "Anonymous",
                        lastName: "Post",
                        question: question.question,
                        explanation: question.explanation,
                        isAnonymousPost: question.isAnonymousPost,
                        createdAt: question.createdAt,
                        updatedAt: question.updatedAt,
                        __v: question.__v
                    }
                } else {
                    return question;
                }
            });

            res.send(filteredAnonymousQuestions);
        })
        .catch(err => {
            console.log(`GETAllQuestionsError01:\n ${err}`);
            res.send("something went wrong please try again later");
        });
});



module.exports = router;