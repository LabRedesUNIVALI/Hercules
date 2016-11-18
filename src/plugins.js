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
        {
            plugin: {
                register: 'hapi-auth-jwt2'
            }
        },
        {
            plugin: {
                register: './controllers/authenticationController.js'
            },
            options: {
                routes: {
                    prefix: '/api'
                }
            }
        },
        {
            plugin: {
                register: 'hapi-auth-bearer-token'
            }
        },
        {
            plugin: {
                register: './controllers/bearerAuthController.js'
            },
            options: {
                routes: {
                    prefix: '/api'
                }
            }
        },
        {
            plugin: {
                register: './plugins/models',
                options: {
                    path: __dirname + '/schemas/',
                    models: [
                        {
                            name: 'Answer',
                            schema: 'answerSchema'
                        },
                        {
                            name: 'Discipline',
                            schema: 'disciplineSchema'
                        },
                        {
                            name: 'Option',
                            schema: 'optionSchema'
                        },
                        {
                            name: 'Question',
                            schema: 'questionSchema'
                        },
                        {
                            name: 'Test',
                            schema: 'testSchema'
                        },
                        {
                            name: 'Theme',
                            schema: 'themeSchema'
                        },
                        {
                            name: 'Token',
                            schema: 'tokenSchema'
                        },
                        {
                            name: 'User',
                            schema: 'userSchema'
                        }
                    ]
                }
            }
        },
        {
            plugin: {
                register: './controllers/assetsController.js'
            }
        },
        {
            plugin: {
                register: './controllers/userController.js'
            },
            options: {
                routes: {
                    prefix: '/api'
                }
            }
        },
        {
            plugin: {
                register: './controllers/disciplineController.js'
            },
            options: {
                routes: {
                    prefix: '/api'
                }
            }
        },
        {
            plugin: {
                register: './controllers/themeController.js'
            },
            options: {
                routes: {
                    prefix: '/api'
                }
            }
        },
        {
            plugin: {
                register: './controllers/questionController.js'
            },
            options: {
                routes: {
                    prefix: '/api'
                }
            }
        },
        {
            plugin: {
                register: './controllers/testController.js'
            },
            options: {
                routes: {
                    prefix: '/api'
                }
            }
        },
        {
            plugin: {
                register: './controllers/tokenController.js'
            },
            options: {
                routes: {
                    prefix: '/api'
                }
            }
        },
        {
            plugin: {
                register: './plugins/voters.js',
                options: {
                    answer: require('./voters/answerVoter.js'),
                    discipline: require('./voters/disciplineVoter.js'),
                    question: require('./voters/questionVoter.js'),
                    test: require('./voters/testVoter.js'),
                    theme: require('./voters/themeVoter.js')
                }
            }
        }
    ]
};
