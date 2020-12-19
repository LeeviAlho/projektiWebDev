var express = require("express");
var router = express.Router();

const { body } = require("express-validator");

/* GET home page. */
router.get("/", function (req, res, next) {
  var postdata = req.app.get("postStorrage");

  res.render("index", { title: "WASC", posts: postdata });
});

router.post("/create", body("*").trim().escape(), function (req, res, next) {
  var local_message = req.body.content;
  var local_author = req.body.author;
  console.log("Sent message: " + local_message);
  console.log("from: " + local_author);

  req.app.get("postStorrage").push({
    author: local_author,
    message: local_message
  });

  res.redirect("/index");
});

module.exports = router;
