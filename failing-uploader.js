var Q = require('q');
var log4js = require('log4js');
var logger = log4js.getLogger('failing-uploader');

exports.uploadFile = function (filename) {
    var deferred = Q.defer();
    Q.fcall(function () {
        var delay = Math.random() * 4000 + 3000;
        logger.info("Starting upload: " + filename);
        setTimeout(function () {
            if (filename === 'file2.txt') {
                logger.error("Timeout while uploading: " + filename);
                return deferred.reject("Timeout while uploading: " + filename);
            }
            else {
                logger.info("Completed upload: " + filename);
                return deferred.resolve("Uploading succesfully: " + filename);
            }
        }, delay)
    });
    return deferred.promise;
}