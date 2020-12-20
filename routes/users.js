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

  //Search posts for user and if found, redirect to that site
  req.app
    .get("postStorrage")
    .filter(function (user) {
      return user.author === username;
    })
    .then(res.redirect("/userview"), res.redirect("/users"));
  //
});

module.exports = router;
