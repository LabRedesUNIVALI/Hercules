'use strict';

const Config = require('getconfig');

const Relish = require('relish')({
    messages: {
        username: 'Deve ser um email válido',
        password: 'Senha inválida'
    }
});

module.exports = exports = {
    connections: [
        {
            port: Config.port,
            labels: ['web'],
            routes: {
                validate: {
                    failAction: Relish.failAction,
                    options: {
                        abortEarly: false
                    }
                }
            }
        }
    ],
    registrations: [
        {
            plugin: {
                register: 'good',
                options: {
                    ops: {
                        interval: 1000
                    },
                    reporters: {
                        myConsoleReporter: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{log: '*', response: '*', error: '*'}]
                        }, {
                            module: 'good-console'
                        }, 'stdout']
                    }
                }
            }
        },
        {
            plugin: {
                register: './plugins/mongoose',
                options: {
                    mongodb_connection_string: Config.mongodb_connection_string,
                    plugins: [
                        {
                            require: 'mongoose-paginate'
                        }
                    ]
                }
            }
        },
        {
            plugin: {
                register: './controllers/kittenController.js'
            },
            options: {
                routes: {
                    prefix: '/api'
                }
            }
        }
    ]
};
