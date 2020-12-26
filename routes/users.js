var express = require("express");
var router = express.Router();

const { body } = require("express-validator");

/* GET users listing. */
router.get("/", function (req, res, next) {
  var postdata = req.app.get("postStorrage");

  res.render("users", { title: "WASC", posts: postdata });
});

router.post("/create", body("*").trim().escape(), function (req, res, next) {
  var username = req.body.author;
  console.log("Searched for: " + username);
  //req.app.get("userinfo").push(username);

  //Go to userview-page with note of the sellected user
  req.app
    .get("userinfo")
    .unshift(username)
    .then(res.redirect("/userview"), res.redirect("/users"));
  //
});

module.exports = router;
