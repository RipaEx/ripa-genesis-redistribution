var ripa = require('ripajs');
var request = require('request');
var phassphrases = require('./delegatesPassphrases');
var delegates = require('./delegates');
var constants = require('./constants');
//var payments = require('./payments');
var logger = require('winston');
logger.level = 'info';
//logger.level = 'debug';

const RECIPIENT = 'PTUaick4CNFZXoZQ8kycTYbYbqBkUDUUeB';
const ENDPOINT = constants.MAIN_NET_ENDPOINT;
const SEND = true;

var displayResponse = function (error, response, body) {
    if (error)
        logger.error(error);
    else
        logger.info(body);
};

var sendTransaction = function (delegate) {
    return function (error, response, body) {
        if (error)
            logger.error(error);
        else
            logger.info(delegate.username + ' ' + delegate.address + ' ' + body.balance);
        if (SEND) {
            if (body.balance !== "0") {
                var transactionsRequest = {};
                var transactionsRequestKey = 'transactions';
                transactionsRequest[transactionsRequestKey] = [];
                var transaction = ripa.transaction.createTransaction(RECIPIENT, parseInt(body.balance) - 10000000, constants.MESSAGE_2, delegate.passphrase, null);
                logger.debug(transaction);
                transactionsRequest[transactionsRequestKey].push(transaction);
                request({
                    url: ENDPOINT + constants.TRANSACTIONS_ENDPOINT,
                    json: transactionsRequest,
                    method: 'POST',
                    headers: {
                        'Content-Type': constants.HEADER_CONTENT_TYPE,
                        'os': constants.HEADER_OS,
                        'version': constants.HEADER_VERSION,
                        'port': constants.HEADER_PORT,
                        'nethash': nethash
                    }
                }, displayResponse);
            }
        } else {
            logger.info('Sending disabled');
        }
    };
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
                }, sendTransaction(phassphrases[key]));
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

if (delegates !== null) {
    var delegatesArray = delegates.delegates;
    for (var key in delegatesArray) {
        if (delegatesArray.hasOwnProperty(key)) {
            console.log(delegatesArray[key].address);
        }
    }
}