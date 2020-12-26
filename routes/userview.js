var express = require("express");
var router = express.Router();

const { body } = require("express-validator");

/* GET users listing. */
router.get("/", function (req, res, next) {
  var postdata = req.app.get("postStorrage");
  var username = req.app.get("userinfo");
  if (username.length > 1) {
    req.app.get("userinfo").pop();
  }

  res.render("userview", { title: "WASC", posts: postdata, author: username });
});

router.post("/create", body("*").trim().escape(), function (req, res, next) {
  var local_message = req.body.message;
  var local_author = req.app.get("userinfo");
  console.log("Sent message: " + local_message);
  console.log("from: " + local_author);

  req.app.get("postStorrage").push({
    author: local_author,
    message: local_message
  });

  res.redirect("/userview");
});

module.exports = router;
