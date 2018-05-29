var ripa = require('ripajs');
var request = require('request');
var phassphrases = require('./delegatesPassphrases');
var constants = require('./constants');
//var payments = require('./payments');
var logger = require('winston');
logger.level = 'info';
//logger.level = 'debug';

const ENDPOINT = constants.MAIN_NET_ENDPOINT;
const SEND = false;

var callback = function (error, response, body) {
    if (error)
        logger.error(error);
    else
        logger.info(body);
};

var rightNetHash = function (error, response, body) {
    nethash = body.nethash;
    logger.debug('NetHash: ' + nethash);
    logger.debug('NetHash Expected: ' + nethashExpected);
    if (nethash === nethashExpected) {
        for (var key in phassphrases) {
            if (phassphrases.hasOwnProperty(key)) {
                request({
                    url: ENDPOINT + constants.BALANCE_ENDPOINT + '?address=' + phassphrases[key].address,
                    json: true,
                    method: 'GET',
                    headers: {
                        'Content-Type': constants.HEADER_CONTENT_TYPE,
                        'os': constants.HEADER_OS,
                        'version': constants.HEADER_VERSION,
                        'port': constants.HEADER_PORT,
                        'nethash': nethash
                    }
                }, callback);
            }
        }
    } else {
        logger.error("ERROR: nethash is wrong");
    }
};

var nethashExpected = constants.MAIN_NET_NETHASH;
logger.info('API endpoint: %s', ENDPOINT);
if (phassphrases !== null) {
    logger.debug('Payments array: %s', JSON.stringify(phassphrases));
    var nethash;
    request({
        url: ENDPOINT + constants.GET_NET_HASH_ENDPOINT,
        json: true,
        method: 'GET',
        headers: {
            'Content-Type': constants.HEADER_CONTENT_TYPE,
            'os': constants.HEADER_OS,
            'version': constants.HEADER_VERSION,
            'port': constants.HEADER_PORT,
            'nethash': 'wrong-nethash'
        }
    }, rightNetHash);
} else {
    logger.error("ERROR: payments file is empty");
}