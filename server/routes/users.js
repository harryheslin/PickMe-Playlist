var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("Pinged by the client!");
});

router.post('/', function(req, res, next) {
  console.log("Pinged by the client!");
});

module.exports = router;
