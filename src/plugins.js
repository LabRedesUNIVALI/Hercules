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
                register: 'inert'
            }
        },
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
        // {
        //     plugin: {
        //         register: './plugins/models',
        //         options: {
        //             path: __dirname + '/schemas/',
        //             models: [
        //                 {
        //                     name: 'Answer',
        //                     schema: 'answerSchema'
        //                 },
        //                 {
        //                     name: 'Discipline',
        //                     schema: 'disciplineSchema'
        //                 },
        //                 {
        //                     name: 'Option',
        //                     schema: 'optionSchema'
        //                 },
        //                 {
        //                     name: 'Question',
        //                     schema: 'questionSchema'
        //                 },
        //                 {
        //                     name: 'Test',
        //                     schema: 'testSchema'
        //                 },
        //                 {
        //                     name: 'Theme',
        //                     schema: 'themeSchema'
        //                 },
        //                 {
        //                     name: 'Token',
        //                     schema: 'tokenSchema'
        //                 },
        //                 {
        //                     name: 'User',
        //                     schema: 'userSchema'
        //                 }
        //             ]
        //         }
        //     }
        // },
        {
            plugin: {
                register: './controllers/assetsController.js'
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
