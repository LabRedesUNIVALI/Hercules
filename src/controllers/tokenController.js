'use strict';

const Joi = require('joi');
const Boom = require('boom');

exports.register = function (server, options, next) {

    const routes = [
        {
            method: 'GET',
            path: '/themes/{themeid}/tokens',
            handler: findAllThemeTokensHandler,
            config: {
                auth: 'jwt',
                validate: {
                    params: {
                        themeid: Joi.string().alphanum()
                    }
                }
            }
        },
    ];

    server.route(routes);

    function findAllThemeTokensHandler(request, reply) {

        request.models.Theme.findById(request.params.themeid)
            .then((theme) => {

                if (!theme) {
                    return reply(Boom.notFound());
                }

                request.server.methods.test.decide(request.auth.credentials.user, 'VIEW', entity, (err, authorized) => {

                    if (err) {
                        return reply(Boom.wrap(err));
                    }

                    if (!authorized) {
                        return reply(Boom.forbidden());
                    }

                    request.models.Token.find({ theme: theme._id })
                        .populate('student')
                        .then((entities) => {

                            if (!entities) {
                                return reply({});
                            }

                            return reply(entities);
                        })
                        .catch((err) => {

                            return reply(Boom.wrap(err));
                        });
                });

            })
            .catch((err) => {

                return reply(Boom.wrap(err));
            });
    }

    next();
};

exports.register.attributes = {
    name: 'tokenController',
    version: '0.0.1'
};
