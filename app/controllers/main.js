var Video = require('../models/video');
var _ = require("underscore");


module.exports.getAllVideos = function(req, res) {
    Video.getVideos(function (videos) {
        var result = {videos: videos, sources: _.uniq(_.pluck(videos, 'source'))};
        res.json(result);
    }); 
}

module.exports.getVideosBySource = function(req, res) {
    Video.getVideos(function (videos) {
        var filtered;
        if (req.params.source === 'null') {
            filtered = videos;
        } else {
            filtered = _.where(videos, {source: req.params.source});
        }
        res.json(filtered);
    });
}


