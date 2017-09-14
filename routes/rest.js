var express = require('express');
var router = express.Router();

var flickrService = require('../services/flickrService');

router.get('/photos/', function (req, res) {
	//console.log(req.params.topic);
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress;
    console.log("Got a client request from " + ip);

    flickrService.getRecentFlickrPhotosWithTag(" ", function (recentPhotos) {
    	res.json(recentPhotos);
    });
});

router.get('/photos/:topic', function (req, res) {
	//console.log(req.params.topic);
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress;
    console.log("Got a client request from " + ip);

    flickrService.getRecentFlickrPhotosWithTag(req.params.topic, function (recentPhotos) {
    	res.json(recentPhotos);
    });
});

module.exports = router;