'use strict';

const Joi = require('joi');
const mongoose = require('mongoose');
const Boom = require('boom');
const Hoek = require('hoek');
const PreMethods = require('../utils/preMethods');

exports.register = function (server, options, next) {

    const routes = [
        {
            method: 'POST',
            path: '/themes/{themeid}/questions',
            handler: createQuestionHandler,
            config: {
                auth: 'jwt',
                pre: [
                    { method: PreMethods.findTheme, assign: 'theme' }
                ],
                validate: {
                    payload: {
                        name: Joi.string().min(2).max(255).required(),
                        correctOption: Joi.number().integer().valid([1, 2, 3, 4, 5]).required(),
                        options: Joi.array().length(5).items(
                            Joi.object().keys({
                                text: Joi.string().min(1).max(255).required()
                            }).required()
                        ).required()
                    },
                    params: {
                        themeid: Joi.string().alphanum()
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/themes/{themeid}/questions',
            handler: findAllThemeQuestionsHandler,
            config: {
                auth: 'jwt',
                pre: [
                    { method: PreMethods.findTheme, assign: 'theme' }
                ],
                validate: {
                    params: {
                        themeid: Joi.string().alphanum()
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/questions',
            handler: findAllQuestionsHandler,
            config: {
                auth: 'jwt'
            }
        },
        {
            method: 'GET',
            path: '/themes/{themeid}/questions/{questionid}',
            handler: findOneThemeQuestionHandler,
            config: {
                auth: 'jwt',
                pre: [
                    { method: PreMethods.findTheme, assign: 'theme' }
                ],
                validate: {
                    params: {
                        themeid: Joi.string().alphanum(),
                        questionid: Joi.string().alphanum()
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/questions/{questionid}',
            handler: findOneQuestionHandler,
            config: {
                auth: 'jwt',
                validate: {
                    params: {
                        questionid: Joi.string().alphanum()
                    }
                }
            }
        },
        {
            method: 'PUT',
            path: '/themes/{themeid}/questions/{questionid}',
            handler: updateQuestionHandler,
            config: {
                auth: 'jwt',
                pre: [
                    { method: PreMethods.findTheme, assign: 'theme' }
                ],
                validate: {
                    params: {
                        themeid: Joi.string().alphanum(),
                        questionid: Joi.string().alphanum()
                    },
                    payload: {
                        name: Joi.string().min(2).max(255).required(),
                        correctOption: Joi.number().integer().valid([1, 2, 3, 4, 5]).required(),
                        options: Joi.array().length(5).items(
                            Joi.object().keys({
                                text: Joi.string().min(1).max(255).required()
                            }).required()
                        ).required()
                    },
                }
            }
        },
        {
            method: 'DELETE',
            path: '/themes/{themeid}/questions/{questionid}',
            handler: removeQuestionHandler,
            config: {
                auth: 'jwt',
                pre: [
                    { method: PreMethods.findTheme, assign: 'theme' }
                ],
                validate: {
                    params: {
                        themeid: Joi.string().alphanum(),
                        questionid: Joi.string().alphanum()
                    }
                }
            }
        }
    ];

    server.route(routes);

    function createQuestionHandler(request, reply) {

        request.server.methods.question.decide(request.auth.credentials.user, 'CREATE', null, (err, authorized) => {

            if (err) {
                return reply(Boom.wrap(err));
            }

            if (!authorized) {
                return reply(Boom.forbidden());
            }

            let question = new request.models.Question(Hoek.merge(request.payload, {
                user: request.auth.credentials.user._id,
                theme: request.pre.theme._id
            }));

            question.save()
                .then((entity) => {

                    return reply(entity);
                })
                .catch((err) => {

                    return reply(Boom.wrap(err));
                });
        });
    }

    function findAllThemeQuestionsHandler(request, reply) {

        request.models.Question.find({ theme: request.pre.theme._id, user: request.auth.credentials.user._id })
            .populate('theme')
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

    function findAllQuestionsHandler(request, reply) {

        request.models.Question.find({ user: request.auth.credentials.user._id })
            .populate('theme')
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

    function findOneThemeQuestionHandler(request, reply) {

        request.models.Question.findOne({ _id: request.params.questionid, theme: request.pre.theme._id })
            .populate('theme')
            .then((entity) => {

                if (!entity) {
                    return reply(Boom.notFound());
                }

                request.server.methods.question.decide(request.auth.credentials.user, 'VIEW', entity, (err, authorized) => {

                    if (err) {
                        return reply(Boom.wrap(err));
                    }

                    if (!authorized) {
                        return reply(Boom.forbidden());
                    }

                    return reply(entity);
                });
            })
            .catch((err) => {

                return reply(Boom.wrap(err));
            });
    }

    function findOneQuestionHandler(request, reply) {

        request.models.Question.findOne({ _id: request.params.questionid })
            .populate('theme')
            .then((entity) => {

                if (!entity) {
                    return reply(Boom.notFound());
                }

                request.server.methods.question.decide(request.auth.credentials.user, 'VIEW', entity, (err, authorized) => {

                    if (err) {
                        return reply(Boom.wrap(err));
                    }

                    if (!authorized) {
                        return reply(Boom.forbidden());
                    }

                    return reply(entity);
                });
            })
            .catch((err) => {

                return reply(Boom.wrap(err));
            });
    }

    function updateQuestionHandler(request, reply) {

        request.models.Question.findOne({ _id: request.params.questionid, theme: request.pre.theme })
            .then((entity) => {

                if (!entity) {
                    return reply(Boom.notFound());
                }

                request.server.methods.question.decide(request.auth.credentials.user, 'UPDATE', entity, (err, authorized) => {

                    if (err) {
                        return reply(Boom.wrap(err));
                    }

                    if (!authorized) {
                        return reply(Boom.forbidden());
                    }

                    entity.name = request.payload.name;
                    entity.correctOption = request.payload.correctOption;
                    entity.options = request.payload.options;

                    entity.save()
                        .then((entity) => {

                            return reply(entity);
                        })
                        .catch((err) => {

                            return reply(Boom.wrap(err));
                        })
                });
            })
            .catch((err) => {

                return reply(Boom.wrap(err));
            });
    }

    function removeQuestionHandler(request, reply) {

        request.models.Question.findOne({ _id: request.params.questionid, theme: request.pre.theme })
            .then((entity) => {

                if (!entity) {
                    return reply(Boom.notFound());
                }

                request.server.methods.question.decide(request.auth.credentials.user, 'REMOVE', entity, (err, authorized) => {

                    if (err) {
                        return reply(Boom.wrap(err));
                    }

                    if (!authorized) {
                        return reply(Boom.forbidden());
                    }

                    entity.delete()
                        .then(() => {

                            return reply(null);
                        })
                        .catch((err) => {

                            return reply(Boom.wrap(err));
                        })
                });
            })
            .catch((err) => {

                return reply(Boom.wrap(err));
            });
    }

    next();
};

exports.register.attributes = {
    name: 'questionController',
    version: '0.0.1'
};
