'use strict';

const Path = require('path');

exports.register = (server, options, next) => {

    const routes = [
        {
            method: 'GET',
            path: '/public/{path*}',
            config: {
                description: 'Provides application static files like HTML, JS and CSS.',
                auth: false,
                handler: {
                    directory: {
                        path: Path.join(__dirname, '..', 'public', 'app'),
                        index: false,
                        listing: false
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/{path*}',
            config: {
                description: 'Send index file managed by AngularJS.',
                handler: (request, reply) => {
                    reply.file(Path.join(__dirname, '..', 'public', 'index.html'));
                }
            }
        }
    ];

    server.route(routes);

    return next();
}

exports.register.attributes = {
    name: 'assetsController',
    version: '0.0.1'
}
