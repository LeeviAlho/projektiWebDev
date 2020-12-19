var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  var postdata = req.app.get("postStorrage");

  res.render("userview", { title: "WASC", posts: postdata });
});

module.exports = router;
