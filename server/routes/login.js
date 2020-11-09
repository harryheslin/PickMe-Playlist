var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  console.log("Pinged by the client!");
  res.status(200).json({ message: "Hello" });
});

module.exports = router;
