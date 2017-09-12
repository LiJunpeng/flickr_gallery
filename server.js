var express = require('express');
var app = express();

var flickrService = require('./services/flickrService');
flickrService.getRecentFlickrPhotos(function () {
    var restRouter = require('./routes/rest');

    app.use('/', express.static(__dirname + '/'));
    app.use('/api/v1', restRouter);

    app.listen(3000);
    console.log("Server initialized");
});