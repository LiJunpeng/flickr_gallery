var express = require('express');
var router = express.Router();

var flickrService = require('../services/flickrService');

router.get('/photos', function (req, res) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress;
    console.log("Got a client request from " + ip);
    var photos = flickrService.recentPhotos;
    res.json(photos);
});

module.exports = router;