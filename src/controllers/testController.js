'use strict';

const Joi = require('joi');
const mongoose = require('mongoose');
const Boom = require('boom');
const RandToken = require('rand-token');
const Hoek = require('hoek');
const PreMethods = require('../utils/preMethods');
const Utils = require('../utils/utils');

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
                        questions: Joi.array().min(1).items(Joi.string().alphanum()).required()
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
                pre: [
                    { method: PreMethods.findTest, assign: 'test' }
                ],
                validate: {
                    params: {
                        testid: Joi.string().alphanum()
                    },
                    payload: {
                        beginDate: Joi.date().format('DD/MM/YYYY H:m').min('now').required(),
                        endDate: Joi.date().format('DD/MM/YYYY H:m').required(),
                        name: Joi.string().min(2).max(255).required(),
                        discipline: Joi.string().alphanum().required(),
                        questions: Joi.array().min(1).items(Joi.string().alphanum()).required()
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
                pre: [
                    { method: PreMethods.findTest, assign: 'test' }
                ],
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
                return reply(Boom.wrap(err));
            }

            if (!authorized) {
                return reply(Boom.forbidden());
            }

            let test = new request.models.Test(Hoek.merge(request.payload, {
                user: request.auth.credentials.user._id
            }));

            if (test.endDate <= test.beginDate) {
                return reply(Boom.badRequest("Data limite não pode ser menor ou igual a data inicial", test.endDate));
            }

            request.models.Discipline.findById(test.discipline)
                .then((discipline) => {

                    const date = new Date();
                    // TODO: create util function to get YYYYMMDD
                    const yyyymmdd = date.getFullYear().toString() + (date.getMonth()+1).toString() + date.getDate().toString();
                    discipline.students.forEach(function (student) {
                        const tokenValue = yyyymmdd + RandToken.uid(8);
                        let token = request.models.Token({value: tokenValue, student: student.name, test: test});
                        test.tokens.push(token);
                        token.save();
                    });

                    test.save()
                        .then((entity) => {

                            return reply(entity);
                        })
                        .catch((err) => {

                            return reply(Boom.wrap(err));
                        });
                })
                .catch((err) => {
                    return reply(Boom.wrap(err));
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
                    return reply({});
                }

                return reply(entities);
            })
            .catch((err) => {

                return reply(Boom.wrap(err));
            });
    }

    function findOneTestHandler(request, reply) {

        request.models.Test.findById(request.params.testid)
            .populate('questions')
            .populate('tokens')
            .populate('discipline')
            .then((entity) => {

                if (!entity) {
                    return reply(Boom.notFound());
                }

                request.server.methods.test.decide(request.auth.credentials.user, 'VIEW', entity, (err, authorized) => {

                    if (err) {
                        return reply(Boom.wrap(err));
                    }

                    if (!authorized) {
                        return reply(Boom.forbidden());
                    }

                    Utils.shuffleTest(entity, (err, shuffledEntity) => {

                        if (err) {
                            return reply(Boom.wrap(err));
                        }

                        return reply(shuffledEntity);
                    });
                });
            })
            .catch((err) => {

                return reply(Boom.wrap(err));
            });
    }

    function updateTestHandler(request, reply) {

        request.server.methods.test.decide(request.auth.credentials.user, 'UPDATE', request.pre.test, (err, authorized) => {

            if (err) {
                return reply(Boom.wrap(err));
            }

            if (!authorized) {
                return reply(Boom.forbidden());
            }

            const date = new Date();
            if (date <= request.pre.test.endDate && date >= request.pre.test.beginDate) {
                return reply(Boom.badRequest('Não pode alterar uma prova em execução'));
            }

            request.pre.test.name = request.payload.name;
            request.pre.test.beginDate = request.payload.beginDate;
            request.pre.test.endDate = request.payload.endDate;
            request.pre.test.discipline = request.payload.discipline;
            request.pre.test.questions = request.payload.questions;
            request.pre.test.tokens = [];

            if (request.pre.test.endDate <= request.pre.test.beginDate) {
                return reply(Boom.badRequest('Data limite não pode ser menor ou igual a data inicial', request.pre.test.endDate));
            }

            request.models.Discipline.findById(request.pre.test.discipline)
                .then((discipline) => {

                    const date = new Date();
                    // TODO: create util function to get YYYYMMDD
                    const yyyymmdd = date.getFullYear().toString() + (date.getMonth()+1).toString() + date.getDate().toString();
                    discipline.students.forEach(function (student) {
                        const tokenValue = yyyymmdd + RandToken.uid(8);
                        let token = request.models.Token({ value: tokenValue, student: student.name, test: request.pre.test });
                        request.pre.test.tokens.push(token);
                        token.save();
                    });

                    request.pre.test.save()
                        .then((entity) => {

                            return reply(entity);
                        })
                        .catch((err) => {

                            return reply(Boom.wrap(err));
                        });
                })
                .catch((err) => {
                    return reply(Boom.wrap(err));
                });
        });
    }

    function removeTestHandler(request, reply) {

        request.server.methods.test.decide(request.auth.credentials.user, 'REMOVE', request.pre.test, (err, authorized) => {

            if (err) {
                return reply(Boom.wrap(err));
            }

            if (!authorized) {
                return reply(Boom.forbidden());
            }

            const date = new Date().toISOString();
            if (date <= request.pre.test.endDate && date >= request.pre.test.beginDate) {
                return reply(Boom.badRequest('Não pode excluir uma prova em execução'))
            }

            request.pre.test.delete()
                .then(() => {

                    return reply(null);
                })
                .catch((err) => {

                    return reply(Boom.wrap(err));
                })
        });
    }


    next();
};

exports.register.attributes = {
    name: 'testController',
    version: '0.0.1'
};
