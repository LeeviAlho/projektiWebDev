var express = require("express");
var router = express.Router();

const { body } = require("express-validator");

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.session.username) {
    res.redirect("/ownpage");
  } else {
    res.render("login", { title: "WASC" });
  }
});

router.post(
  "/create",
  body("*").trim().escape().isLength({ min: 1 }),
  function (req, res, next) {
    if (req.app.get("userbase").indexOf(req.body.author) < 0) {
      res.render("sign", { title: "WASC" });
    } else {
      var username = req.body.author;
      console.log("Searched for: " + username);
      //
      //Go to userview-page with note of the sellected user
      req.session.username = username;
      res.redirect("/ownpage");
    }
    //
  }
);

module.exports = router;