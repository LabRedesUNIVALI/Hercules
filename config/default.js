'use strict';

module.exports = {
    port: process.env.NODE_PORT ? process.env.NODE_PORT : 3000,
    mongodb_connection_string: process.env.MONGODB_CONNECTION_STRING ? process.env.MONGODB_CONNECTION_STRING: 'mongodb://localhost/hercules',
};
