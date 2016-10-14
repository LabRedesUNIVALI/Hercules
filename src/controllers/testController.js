'use strict';

const Joi = require('joi');
const mongoose = require('mongoose');
const Boom = require('boom');
const RandToken = require('rand-token');
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
                        beginDate: Joi.date().format('DD/MM/YYYY H:m').min('now').required(),
                        endDate: Joi.date().format('DD/MM/YYYY H:m').required(),
                        name: Joi.string().min(2).max(255).required(),
                        discipline: Joi.string().alphanum().required(),
                        questions: Joi.array().items(Joi.string().alphanum()).required()
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
            path: '/tests/{testid}',
            handler: updateTestHandler,
            config: {
                auth: 'jwt',
                validate: {
                    params: {
                        testid: Joi.string().alphanum()
                    },
                    payload: {
                        beginDate: Joi.date().format('DD/MM/YYYY H:m').min('now').required(),
                        endDate: Joi.date().format('DD/MM/YYYY H:m').required(),
                        name: Joi.string().min(2).max(255).required(),
                        discipline: Joi.string().alphanum().required(),
                        questions: Joi.array().items(Joi.string().alphanum()).required()
                    }
                }
            }
        },
        {
            method: 'DELETE',
            path: '/tests/{testid}',
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

            if (test.endDate <= test.beginDate) {
                reply(Boom.badRequest("Data limite não pode ser menor ou igual a data inicial", test.endDate));
            }

            request.models.Discipline.findById(test.discipline)
                .then((discipline) => {

                    const date = new Date();
                    // TODO: create util function to get YYYYMMDD
                    const yyyymmdd = date.getFullYear().toString() + (date.getMonth()+1).toString() + date.getDate().toString();
                    discipline.students.forEach(function (student) {
                        const tokenValue = yyyymmdd + RandToken.uid(8);
                        let token = request.models.Token({value: tokenValue, student: student, test: test});
                        test.tokens.push(token);
                        token.save();
                    });

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
            .populate('questions')
            .populate('tokens')
            .populate('discipline')
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
            .populate('questions')
            .populate('tokens')
            .populate('discipline')
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

                    const date = new Date();
                    if (date <= entity.endDate && date >= entity.beginDate) {
                        reply(Boom.badRequest('Não pode alterar uma prova em execução'))
                    }

                    entity.name = request.payload.name;
                    entity.beginDate = request.payload.beginDate;
                    entity.endDate = request.payload.endDate;
                    entity.discipline = request.payload.discipline;
                    entity.questions = request.payload.questions;
                    entity.tokens = [];

                    if (entity.endDate <= entity.beginDate) {
                        reply(Boom.badRequest("Data limite não pode ser menor ou igual a data inicial", entity.endDate));
                    }

                    request.models.Discipline.findById(entity.discipline)
                        .then((discipline) => {

                            const date = new Date();
                            // TODO: create util function to get YYYYMMDD
                            const yyyymmdd = date.getFullYear().toString() + (date.getMonth()+1).toString() + date.getDate().toString();
                            discipline.students.forEach(function (student) {
                                const tokenValue = yyyymmdd + RandToken.uid(8);
                                let token = request.models.Token({value: tokenValue, student: student, test: entity});
                                entity.tokens.push(token);
                                token.save();
                            });

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

                    const date = new Date();
                    if (date <= entity.endDate && date >= entity.beginDate) {
                        reply(Boom.badRequest('Não pode excluir uma prova em execução'))
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
