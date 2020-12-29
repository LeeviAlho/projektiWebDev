var express = require("express");
var router = express.Router();

const { body } = require("express-validator");

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.app.get("postStorrage")) {
    var postdata = req.app.get("postStorrage");
  }
  var username = req.session.username;
  console.log("Username set to: " + username);
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  res.render("userview", {
    title: "WASC",
    posts: postdata,
    author: req.session.username,
    cookietimer: req.session.views
  });
});

router.post("/create", body("*").trim().escape(), function (req, res, next) {
  var local_message = req.body.message;
  var local_author = req.body.author;
  console.log("Sent message: " + local_message);
  console.log("from: " + local_author);

  req.app.get("postStorrage").push({
    author: local_author,
    message: local_message
  });

  res.redirect("/userview");
});

// router.post("/create", body("*").trim().escape(), function (req, res, next) {
//   var username = req.body.username;
//   console.log("Username set to:" + username);
//   var local_message = req.body.message;
//   console.log("Sent message: " + local_message);
//   console.log("from: " + username);

//   req.app.get("postStorrage").push({
//     author: username,
//     message: local_message
//   });

//   res.redirect("/userview");
// });

module.exports = router;
