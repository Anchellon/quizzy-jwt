const Quiz = require("../model/Quiz");
const Question = require("../model/Question");
// const { body, validationResult } = require("express-validator");
exports.question_info_getMethod = async (req, res) => {
    let qns = await Question.find({ quiz: req.params.qzid });
    console.log(req.params.qzid);
    console.log(qns);
    res.status(200).send(qns);
};

exports.question_deleteMethod = (req, res) => {
    res.send("NOT IMPLEMENTED: question delete method");
};

exports.question_create_postMethod = [
    async (req, res, next) => {
        console.log(req.body);
        // let options = req.body.options;
        // let correctAnswer = req.body.isCorrect;
        let qn = await Question.create({
            qnText: req.body.questionText,
            quiz: req.body.quiz,
            options: req.body.options,
            correctAnswer: req.body.correctAnswer,
        });
        res.status(200).send(qn);
    },
];
