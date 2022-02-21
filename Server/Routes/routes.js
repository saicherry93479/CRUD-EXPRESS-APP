const express = require("express");
const { route } = require("express/lib/application");

const router = express.Router();
const {
  homeGet,
  homePost,
  completed,
  deleted,
  completeUndo,
  deleteUndo,
} = require("../Controllers/controlllers");

router.route("/").get(homeGet).post(homePost, homeGet);
router.route("/completed/:id").get(completed, homeGet);
router.get("/deleted/:id", deleted, homeGet);
router.get("/completeUndo/:id/", completeUndo, homeGet);
router.get("/deleteUndo/:id/", deleteUndo, homeGet);

module.exports = router;
