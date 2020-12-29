var express = require("express");
var router = express.Router();

const { body } = require("express-validator");

var ownpage = false;
var username;

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.app.get("postStorrage")) {
    var postdata = req.app.get("postStorrage");
  }
  if (req.app.get("userinfo").length > 0) {
    username = req.app.get("userinfo").pop();
  } else if (req.session.username) {
    username = req.session.username;
    ownpage = true;
  } else {
    res.redirect("/");
  }
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
    cookietimer: req.session.views,
    form: ownpage
  });
});

router.post("/create", body("*").trim().escape(), function (req, res, next) {
  var local_message = req.body.message;
  var local_author = req.session.username;
  console.log("Sent message: " + local_message);
  console.log("from: " + local_author);

  req.app.get("postStorrage").push({
    author: local_author,
    message: local_message
  });

  res.redirect("/");
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
