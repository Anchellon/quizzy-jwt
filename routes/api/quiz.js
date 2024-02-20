const express = require("express");
const router = express.Router();

/**  Require controller modules. */
const quiz_controller = require("../../controllers/quizController");

// POST to Create an empty quiz with quiz name
router.post("/", quiz_controller.quiz_create_postMethod);
module.exports = router;
