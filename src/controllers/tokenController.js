'use strict';

const Joi = require('joi');
const Boom = require('boom');
const PreMethods = require('../utils/preMethods');

exports.register = function (server, options, next) {

    const routes = [
        {
            method: 'GET',
            path: '/tests/{testid}/tokens',
            handler: findAllTestTokensHandler,
            config: {
                auth: 'jwt',
                pre: [
                    { method: PreMethods.findTest, assign: 'test' }
                ],
                validate: {
                    params: {
                        testid: Joi.string().alphanum()
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/tokens/{tokenid}',
            handler: findTokenHandler,
            config: {
                auth: 'jwt',
                validate: {
                    params: {
                        tokenid: Joi.string().alphanum()
                    }
                }
            }
        }
    ];

    server.route(routes);

    function findAllTestTokensHandler(request, reply) {

        request.server.methods.test.decide(request.auth.credentials.user, 'VIEW', request.pre.test, (err, authorized) => {

            if (err) {
                return reply(Boom.wrap(err));
            }

            if (!authorized) {
                return reply(Boom.forbidden());
            }

            request.models.Token.find({ test: request.pre.test._id }, {
                _id: 1,
                value: 1,
                expired: 1,
                student: 1,
                studentTest: 1
            })
                .then((entities) => {

                    if (!entities) {
                        return reply({});
                    }
                    
                    const hydratedEntities = entities.map((entity) => {
                        let hydratedEntity = {};
                        hydratedEntity._id = entity._id;
                        hydratedEntity.value = entity.value;
                        hydratedEntity.expired = entity.expired;
                        hydratedEntity.student = entity.student;
                        hydratedEntity.studentTest = {};
                        if (!entity.studentTest) {
                            hydratedEntity.message = 'not_started';
                        }
                        else if (entity.studentTest && !entity.studentTest.note) {
                            hydratedEntity.message = 'started_not_finished';
                            hydratedEntity.studentTest.note = null;
                        } else {
                            hydratedEntity.message = 'finished';
                            hydratedEntity.studentTest.note = entity.studentTest.note;
                        }

                        return hydratedEntity;
                    });

                    return reply(hydratedEntities);
                })
                .catch((err) => {

                    return reply(Boom.wrap(err));
                });
        });
    }

    function findTokenHandler(request, reply) {

        request.models.Token.findById(request.params.tokenid)
            .then((entity) => {

                if (!entity) {
                    return reply(Boom.notFound());
                }

                return reply(entity);
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
