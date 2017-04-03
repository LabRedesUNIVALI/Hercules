'use strict';

const host = process.env.NODE_IP || '127.0.0.1';
const port = process.env.NODE_PORT || 3000;

let mongodb_connection_string = 'mongodb://localhost/hercules';

if (process.env.MONGODB_URL) {
    mongodb_connection_string = `${process.env.MONGODB_URL}hercules`;
}

module.exports = {
    host,
    port,
    mongodb_connection_string
};
