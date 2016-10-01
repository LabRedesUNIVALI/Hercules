'use strict';

const Joi = require('joi');
const mongoose = require('mongoose');
const Boom = require('boom');
const Hoek = require('hoek');

exports.register = function (server, options, next) {

    const routes = [
        {
            method: 'POST',
            path: '/tests',
            handler: createTestHandler,
            config: {
                auth: 'jwt',
                validate: {
                    payload: {
                        beginDate: Joi.date().required(),
                        endDate: Joi.date().required(),
                        name: Joi.string().min(2).max(255).required(),
                        discipline: Joi.string().alphanum().required()
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/tests',
            handler: findAllTestsHandler,
            config: {
                auth: 'jwt'
            }
        },
        {
            method: 'GET',
            path: '/tests/{testid}',
            handler: findOneTestHandler,
            config: {
                auth: 'jwt',
                validate: {
                    params: {
                        testid: Joi.string().alphanum()
                    }
                }
            }
        },
        {
            method: 'PUT',
            path: '/test/{testid}',
            handler: updateTestHandler,
            config: {
                auth: 'jwt',
                validate: {
                    params: {
                        testid: Joi.string().alphanum()
                    },
                    payload: {
                        beginDate: Joi.date().required(),
                        endDate: Joi.date().required(),
                        name: Joi.string().min(2).max(255).required(),
                        discipline: Joi.string().alphanum().required()
                    }
                }
            }
        },

        {
            method: 'DELETE',
            path: '/test/{testid}',
            handler: removeTestHandler,
            config: {
                auth: 'jwt',
                validate: {
                    params: {
                        testid: Joi.string().alphanum()
                    }
                }
            }
        }

    ];

    server.route(routes);

    function createTestHandler(request, reply) {

        request.server.methods.test.decide(request.auth.credentials.user, 'CREATE', null, (err, authorized) => {

            if (err) {
                reply(Boom.wrap(err));
            }

            if (!authorized) {
                reply(Boom.forbidden());
            }

            let test = new request.models.Test(Hoek.merge(request.payload, {
                user: request.auth.credentials.user._id
            }));

            request.models.Discipline.findById(test.discipline)
                .then((discipline) => {

                    // TODO: generate random tokens
                    let i = 0;
                    discipline.students.map(function (student) {
                        i++;
                        request.models.Token.create({value: i, student: student, test: test});
                    });

                    // TODO: save all theme and questions object in database, then a user can't change data
                    test.save()
                        .then((entity) => {

                            reply(entity);
                        })
                        .catch((err) => {

                            reply(Boom.wrap(err));
                        });
                })
                .catch((err) => {
                    reply(Boom.wrap(err));
                });
        });
    }

    function findAllTestsHandler(request, reply) {

        request.models.Test.find({ user: request.auth.credentials.user._id })
            .then((entities) => {

                if (!entities) {
                    reply({});
                }

                reply(entities);
            })
            .catch((err) => {

                reply(Boom.wrap(err));
            });
    }

    function findOneTestHandler(request, reply) {

        request.models.Test.findById(request.params.testid)
            .then((entity) => {

                if (!entity) {
                    reply(Boom.notFound());
                }

                request.server.methods.test.decide(request.auth.credentials.user, 'VIEW', entity, (err, authorized) => {

                    if (err) {
                        reply(Boom.wrap(err));
                    }

                    if (!authorized) {
                        reply(Boom.forbidden());
                    }

                    reply(entity);
                });
            })
            .catch((err) => {

                reply(Boom.wrap(err));
            });
    }

    function updateTestHandler(request, reply) {

        request.models.Test.findById(request.params.testid)
            .then((entity) => {

                if (!entity) {
                    reply(Boom.notFound());
                }

                request.server.methods.test.decide(request.auth.credentials.user, 'UPDATE', entity, (err, authorized) => {

                    if (err) {
                        reply(Boom.wrap(err));
                    }

                    if (!authorized) {
                        reply(Boom.forbidden());
                    }

                    entity.name = request.payload.name;
                    entity.beginDate = request.payload.beginDate;
                    entity.endDate = request.payload.endDate;
                    entity.discipline = request.payload.discipline;

                    request.models.Discipline.findById(entity.discipline)
                        .then((discipline) => {

                            // TODO: generate random tokens
                            let i = 0;
                            discipline.students.map(function (student) {
                                i++;
                                request.models.Token.create({value: i, student: student, test: test});
                            });

                            // TODO: save all theme and questions object in database, then a user can't change data
                            entity.save()
                                .then((entity) => {

                                    reply(entity);
                                })
                                .catch((err) => {

                                    reply(Boom.wrap(err));
                                });
                        })
                        .catch((err) => {
                            reply(Boom.wrap(err));
                        });
                });
            })
            .catch((err) => {

                reply(Boom.wrap(err));
            });
    }

    function removeTestHandler(request, reply) {

        request.models.Test.findById(request.params.testid)
            .then((entity) => {

                if (!entity) {
                    reply(Boom.notFound());
                }

                request.server.methods.test.decide(request.auth.credentials.user, 'REMOVE', entity, (err, authorized) => {

                    if (err) {
                        reply(Boom.wrap(err));
                    }

                    if (!authorized) {
                        reply(Boom.forbidden());
                    }

                    entity.delete()
                        .then(() => {

                            reply(null);
                        })
                        .catch((err) => {

                            reply(Boom.wrap(err));
                        })
                });
            })
            .catch((err) => {

                reply(Boom.wrap(err));
            })
    }


    next();
};

exports.register.attributes = {
    name: 'testController',
    version: '0.0.1'
};
