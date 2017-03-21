var Q = require('q');
var log4js = require('log4js');
var logger = log4js.getLogger('upload-example-4');
var uploader = require('./failing-uploader');
var _ = require('underscore');

var filenames = ['file1.jpg', 'file2.txt', 'file3.pdf'];
var results = [];
var resultPromises = []

var lastPromise = filenames.reduce(function (promise, filename) {
    var promiseReturn = promise.then(function () {
        results.push(true);
        return uploader.uploadFile(filename);
    })
        .catch(function (error) {
            results.push(false);
            logger.error("Caught an error but continuing with the other uploads.");
        });
    resultPromises.push(promiseReturn)
    return promiseReturn
}, Q.resolve());

lastPromise
    .then(function (result) {
        // Remove the first result, which is <true> returned by
        // the seed promise Q.resolve().
        // This is a clumsy way of storing and retrieving the results.
        // Suggestions for improvement welcome!
        results.splice(0, 1);
        logger.info("All files uploaded. Results:");
        logger.info(results);
        logger.info(result)
    })
    .catch(function (error) {
        logger.error("Not all files uploaded: " + error);
    });
Q.allSettled(resultPromises)
    .then(function (results) {
        logger.info("All files uploaded. Results:");
        logger.info(_.reject(results.map(function (result) { return result.value }),
            function (val) { return _.isUndefined(val) }));
    })
    .catch(function (error) {
        logger.error(error);
    });
console.log(resultPromises)