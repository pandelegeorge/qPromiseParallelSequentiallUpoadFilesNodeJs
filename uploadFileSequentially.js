var Q = require('q');
var log4js = require('log4js');
var logger = log4js.getLogger('upload-example-3');
var uploader = require('./uploader');

var filenames = ['file1.jpg', 'file2.txt', 'file3.pdf'];

var lastPromise = filenames.reduce(function(promise, filename) {
    return promise.then(function() {
        return uploader.uploadFile(filename);
    });
}, Q.resolve())
 
lastPromise
  .then(function() {
    logger.info("All files uploaded.");
  })
  .catch(function(error) {
    logger.error(error);
  });