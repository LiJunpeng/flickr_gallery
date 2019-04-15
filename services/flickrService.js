var flickrApi = require('flickrapi');
var flickrOptions = {
    //put your flickr api key here
    api_key: ""
};

// var recentPhotos = [];
// var photoCount = 100;
// var searchTag = 'mountain';

function getRecentFlickrPhotosWithTag(searchTag, callback) {
    var recentPhotos = [];
    var photoCount = 100;
    console.log(searchTag);

    flickrApi.tokenOnly(flickrOptions, function (err, flickr) {
        flickr.photos.search({tags: searchTag, page: 1, per_page: photoCount}, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            var photos = result.photos.photo;
            var i = 0;
            photos.forEach(function (photo) {
                var title = photo.title;
                var link = composePhotoUrl(photo.owner, photo.id);
                var src = composePhotoSrc(photo);

                populateTags(flickr, photo.id, function (tags) {
                    recentPhotos.push({
                        title: title,
                        link: link,
                        src: src,
                        tags: tags,
                        originalIndex: i++
                    });
                    if (recentPhotos.length == 100) {
                        callback(recentPhotos);
                    }
                });
            });
        });
    });

}


function getRecentFlickrPhotos(callback) {
    flickrApi.tokenOnly(flickrOptions, function (err, flickr) {
        flickr.photos.search({tags: searchTag, page: 1, per_page: photoCount}, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            var photos = result.photos.photo;
            var i = 0;
            photos.forEach(function (photo) {
                var title = photo.title;
                var link = composePhotoUrl(photo.owner, photo.id);
                var src = composePhotoSrc(photo);

                populateTags(flickr, photo.id, function (tags) {
                    recentPhotos.push({
                        title: title,
                        link: link,
                        src: src,
                        tags: tags,
                        originalIndex: i++
                    });
                    if (recentPhotos.length == 100) {
                        return;
                    }
                });
            });
        });
    });
}

function composePhotoUrl(userId, photoId) {
    //https://www.flickr.com/photos/12037949754@N01/155761353/
    return 'https://www.flickr.com/photos/' + userId + '/' + photoId;
}

function composePhotoSrc(photo) {
    //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
}

function populateTags(flickr, photoId, callback) {
    flickr.photos.getInfo({photo_id: photoId}, function (err, result) {
        var rawTags = [];
        result.photo.tags.tag.forEach(function (tag) {
            rawTags.push(tag.raw);
        });
        tags = rawTags.join();
        callback(tags);
    });
}

module.exports = {
    getRecentFlickrPhotosWithTag: getRecentFlickrPhotosWithTag,
    getRecentFlickrPhotos: getRecentFlickrPhotos
};
