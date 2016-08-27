'use strict';

const Glue = require('glue');

const options = {
    relativeTo: __dirname
};

Glue.compose(require('./plugins.js'), options, (err, server) => {

    if (err) {
        throw err;
    }

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log(`Server running at: ${server.info.uri}`);
    });

    module.exports = server;

});
