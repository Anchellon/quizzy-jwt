const Quiz = require("../model/Quiz");
const Question = require("../model/Question");
const { body, validationResult } = require("express-validator");

/** get a list of all quizes by a particular user  */
exports.index = (req, res, next) => {
    // get a list of all quizes by a particular user
    resObj = {};
    Quiz.find({})
        .then((quizArray) => {
            if (quizArray) {
                resObj.quizzes = quizArray;
            }
            resObj.message = "Quiz List for the user";
            res.status(200).send(resObj);
        })
        .catch((error) => {
            //When there are errors We handle them here
            console.log(err);
            res.send(400, "Bad Request");
        });
};
/**
 * Creating an empty quiz
 * Testing Complete
 * Working
 */
exports.quiz_create_postMethod = [
    body("quizName", "Quiz name required").trim().isLength({ min: 1 }).escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        const quiz = new Quiz({ name: req.body.quizName });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages
            res.status(422).send({
                message: "Invalid Input",
                errors: errors.array(),
            });
            return;
        }
        Quiz.findOne({ name: req.body.quizName })
            .then((found_quiz) => {
                // console.log(found_quiz);
                if (found_quiz) {
                    // Quiz exists, redirect to its detail page.
                    res.status(403).send({
                        message: "Quiz with the same Name Exists",
                        qid: found_quiz.id,
                    });
                } else {
                    quiz.save().then((savedDoc) => {
                        resObj = {};

                        // Quiz saved.
                        resObj.msg = "Saved Successfully";
                        resObj.name = savedDoc.name;
                        resObj.id = savedDoc._id;
                        res.status(200).send(resObj);
                    });
                }
            })
            .catch((error) => {
                //When there are errors We handle them here
                console.log(err);
                res.send(400, "Bad Request");
            });
    },
];

exports.quiz_Info_getMethod = (req, res) => {
    let resObj = {};
    Quiz.findById(req.params.id)
        .then((quiz) => {
            // For the quiz find all relevant details including all questions and their corresponding
            resObj.quiz = quiz;
            Question.find({ quiz: req.params.id })
                .then((qns) => {
                    resObj.questions = qns;
                    res.status(200).send(resObj);
                })
                .catch((error) => {
                    //When there are errors We handle them here
                    console.log(err);
                    res.send(400, "Bad Request");
                });
        })
        .catch((error) => {
            //When there are errors We handle them here
            console.log(error);
            res.send(400, "Bad Request");
        });
};
exports.quiz_deleteMethod = (req, res, next) => {
    console.log(req.params);
    console.log("hi");
    Quiz.findOne({ _id: req.params.id })
        .then(async (val) => {
            let id = await val.deleteOne();
            // console.log(id);
            res.status(204).send({
                msg: "Successfully deleted",
            });
        })
        .catch((err) => {
            console.log(`caught the error: ${err}`);
            return res.status(500).json(err);
        });
};
exports.quiz_TestInfo_getMethod = (req, res) => {
    let resObj = {};
    console.log(req.params.id);
    Quiz.findById(req.params.id)
        .select("-updatedAt -createdAt -__v")
        .then((quiz) => {
            // For the quiz find all relevant details including all questions and their corresponding
            resObj.quiz = quiz;
            Question.find({ quiz: req.params.id })
                .select("-correctAnswer -updatedAt -createdAt -__v")
                .then((qns) => {
                    resObj.questions = qns;
                    res.status(200).send(resObj);
                })
                .catch((error) => {
                    //When there are errors We handle them here
                    console.log(err);
                    res.send(400, "Bad Request");
                });
        })
        .catch((error) => {
            //When there are errors We handle them here
            console.log(error);
            res.send(400, "Bad Request");
        });
};
