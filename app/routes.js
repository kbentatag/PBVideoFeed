const controller = require('./controllers/main');

module.exports = function (app) {
    // get all videos
    app.get('/api/videos', controller.getAllVideos);

    // filter videos by source
    app.get('/api/videos/findBySource/:source', controller.getVideosBySource);
};

