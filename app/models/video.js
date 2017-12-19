var request = require("request")
var dataFeed = require('../../config/config');

module.exports.getVideos = function(callback){

request({
    url: dataFeed.url,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        callback(body.items) 
    }
})

};