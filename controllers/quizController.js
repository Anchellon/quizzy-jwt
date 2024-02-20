const Quiz = require("../model/Quiz");
// const Question = require("../models/Question");
const { body, validationResult } = require("express-validator");

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
