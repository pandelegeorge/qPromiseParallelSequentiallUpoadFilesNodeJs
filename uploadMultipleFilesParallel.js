var Q = require('q');
var log4js = require('log4js');
var logger = log4js.getLogger('upload-example-2');
var uploader = require('./uploader');

var filenames = ['file1.jpg', 'file2.txt', 'file3.pdf'];
var promises = filenames.map(uploader.uploadFile);

Q.allSettled(promises)
    .then(function(results) {
        logger.info("All files uploaded. Results:");
        logger.info(results.map(function(result) { return result.state }));
    })
    .catch(function(error) {
        logger.error(error);
    });