var Q = require('q');
var log4js = require('log4js');
var logger = log4js.getLogger('uploader');

exports.uploadFile = function(filename) {
    var deferred = Q.defer();
    Q.fcall(function() {
        var delay = Math.random() * 4000 + 3000;
        logger.info("Starting upload: " + filename);
        setTimeout(function() {
            logger.info("Completed upload: " + filename);
            return deferred.resolve();
        }, delay)
    });
    return deferred.promise;
}