'use strict';

const host = process.env.NODE_IP || '127.0.0.1';
const port = process.env.NODE_PORT || 3000;

const db_name = process.env.OPENSHIFT_APP_NAME || 'hercules';
const mongodb_connection_string = 'mongodb://localhost/' + db_name;

if (process.env.MONGODB_URL) {
    mongodb_connection_string = process.env.MONGODB_URL + db_name;
}

module.exports = {
    host: host,
    port: port,
    mongodb_connection_string: mongodb_connection_string
};
