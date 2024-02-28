const Quiz = require("../model/Quiz");
const Question = require("../model/Question");
const { body, validationResult } = require("express-validator");
exports.question_info_getMethod = async (req, res) => {
    let qns = await Question.find({ quiz: req.params.qzid });
    console.log(req.params.qzid);
    console.log(qns);
    res.status(200).send(qns);
};

exports.question_deleteMethod = (req, res) => {
    res.send("NOT IMPLEMENTED: question delete method");
};
