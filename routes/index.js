var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.sendFile('../public/complay.html');
});

router.get('/download', function(req, res) {
	res.redirect('http://google.com/');
});

module.exports = router;
