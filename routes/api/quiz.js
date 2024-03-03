const express = require("express");
const router = express.Router();

/**  Require controller modules. */
const quiz_controller = require("../../controllers/quizController");
const question_controller = require("../../controllers/questionController");

router.get("/", quiz_controller.index);

// POST to Create an empty quiz with quiz name **
router.post("/", quiz_controller.quiz_create_postMethod);

// DELETE Quiz with a specific ID
router.delete("/:id", quiz_controller.quiz_deleteMethod);

// ** after creating a quiz you are redirected to new quiz page
router.get("/:id", quiz_controller.quiz_Info_getMethod);
// GET Question details along with all options associcated with it
// may need some edit in route name
// router.get("/:qzid/questions", question_controller.question_info_getMethod);

// router.delete("/question/:qzid", question_controller.question_deleteMethod);

// Test view api to get test info!
router.get("/student/:id", quiz_controller.quiz_TestInfo_getMethod);

module.exports = router;
