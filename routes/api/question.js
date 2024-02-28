const express = require("express");
const router = express.Router();
const question_controller = require("../../controllers/questionController");

router.get("/qz/:qzid/", question_controller.question_info_getMethod);
router.post("/qz/:qzid", question_controller.question_create_postMethod);

router.delete("/:id", question_controller.question_deleteMethod);
// POST Question details along with all options associcated with it
// router.patch("/:id", question_controller.question_info_patchMethod);

module.exports = router;
