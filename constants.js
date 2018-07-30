const MAIN_NET_ENDPOINT = 'https://api2.ripaex.io'; 
const MAIN_NET_NETHASH = 'bee1634649fc6a759e5fdb8f3c4bcb4b5189c1f2a6b48284a6445f3f09db844e';
const GET_NET_HASH_ENDPOINT = '/api/blocks/getNetHash';
const TRANSACTIONS_ENDPOINT = '/peer/transactions';
const BALANCE_ENDPOINT = '/api/accounts/getBalance';
const HEADER_CONTENT_TYPE = 'application/json';
const HEADER_OS = 'ripa-pool';
const HEADER_PORT = 5500;
const HEADER_VERSION = require('./package.json').version;
const PRECISION = 8;
const MESSAGE_1 = 'Early Forgers Sharing: thank You for your support';
const MESSAGE_2 = 'Genesis redistribution';

module.exports = {
    MAIN_NET_ENDPOINT: MAIN_NET_ENDPOINT,
    MAIN_NET_NETHASH: MAIN_NET_NETHASH,
    GET_NET_HASH_ENDPOINT: GET_NET_HASH_ENDPOINT,
    TRANSACTIONS_ENDPOINT: TRANSACTIONS_ENDPOINT,
    BALANCE_ENDPOINT: BALANCE_ENDPOINT,
    HEADER_CONTENT_TYPE: HEADER_CONTENT_TYPE,
    HEADER_OS: HEADER_OS,
    HEADER_PORT: HEADER_PORT,
    HEADER_VERSION: HEADER_VERSION,
    PRECISION: PRECISION,
    MESSAGE_1: MESSAGE_1,
    MESSAGE_2: MESSAGE_2,
    roundDown: function (number, decimals) {
        decimals = decimals || 0;
        return (Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals));
    }
};