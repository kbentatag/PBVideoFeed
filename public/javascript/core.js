// Authorizing 3rd parties urls
var videoFeedApp= angular.module('videoFeedApp', [])
        .config(function ($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                'self',
                '*://www.youtube.com/**',
                '*://www.facebook.com/**',
                '*://cdn.playbuzz.com/**'
            ]);
        });

videoFeedApp.controller('mainController', function ($scope, $http) {

    //function to get a "safe" youtube url for iframe
    $scope.getYoutubeIframeSrc = function (videoId) {
        return '//www.youtube.com/embed/' + videoId;
    };
    
    //function to get a "safe" facebook url for iframe
    $scope.getFacebookIframeSrc = function (videoId) {
        return '//www.facebook.com/video/embed?video_id=' + videoId;
    };
    
    //function to format a number adding a suffix: thousands (K), millions (M), billions (B)
    $scope.formatNumberWithSuffix = function (number) {
        var SUFFIXES = ["", "K", "M", "B"];
        // what suffix? 
        var tier = Math.log10(number) / 3 | 0;

        // if zero, we don't need a suffix
        if(tier === 0) return number;

        // get suffix and determine scale
        var prefix = SUFFIXES[tier];
        var scale = Math.pow(10, tier * 3);

        // scale the number
        var scaled = number / scale;

        // format number and add suffix
        return scaled.toFixed(1) + prefix;
    };

    //function that will filter the video feed by source
    $scope.filterFeedBySource = function (source) {
        
        $http.get('/api/videos/findBySource/' + source)
            .success(function (data) {
                $scope.videos = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
        });
    };


    // when landing on the page, get all videos and show them
    $http.get('/api/videos')
        .success(function (data) {
            $scope.videos = data.videos;
            $scope.sources = data.sources;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

});