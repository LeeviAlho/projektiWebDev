var express = require("express");
var router = express.Router();

const { body } = require("express-validator");

var username;

/* GET users listing. */
router.get("/", function (req, res, next) {
  var postdata = req.app.get("postStorrage");
  username = req.app.get("userinfo");
  console.log("Username set to: " + username);
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  res.render("userview", {
    title: "WASC",
    posts: postdata,
    author: username,
    cookietimer: req.session.views
  });
});

router.post("/create", body("*").trim().escape(), function (req, res, next) {
  console.log("Username set to:" + username);
  var local_message = req.body.message;
  console.log("Sent message: " + local_message);
  console.log("from: " + username);

  req.app.get("postStorrage").push({
    author: username,
    message: local_message
  });

  res.redirect("/userview");
});

module.exports = router;
