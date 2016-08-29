'use strict';

const Path = require('path');

exports.register = (server, options, next) => {
    server.route([
        {
            method: 'GET',
            path: '/public/{path*}',
            config: {
                auth: false,
                description: 'Static assets',
                handler: {
                    directory: {
                        path: Path.join(__dirname, '..', 'public'),
                        index: false,
                        listing: false
                    }
                }
            }
        }
    ]);
    return next();
}

exports.register.attributes = {
    name: 'hercules-static-files',
    version: '0.0.1'
}