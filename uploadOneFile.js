var log4js = require('log4js');
var logger = log4js.getLogger('upload-example-1');
var uploader = require('./uploader');

var filename = 'file1.jpg';

uploader.uploadFile(filename)
    .then(function(result) {
        logger.info("The file has been uploaded.");
    })
    .catch(function(error) {
        logger.error(error);
    });
