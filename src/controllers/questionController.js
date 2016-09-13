'use strict';

const Joi = require('joi');
const mongoose = require('mongoose');
const Boom = require('boom');
const Hoek = require('hoek');

exports.register = function (server, options, next) {

    const routes = [
        {
            method: 'POST',
            path: '/themes/{themeid}/questions',
            handler: createQuestionHandler,
            config: {
                auth: 'jwt',
                validate: {
                    payload: {
                        name: Joi.string().min(2).max(20).required(),
                        correctOption: Joi.number().integer().valid([1, 2, 3, 4, 5]).required(),
                        options: Joi.array().length(5).items(
                            Joi.object().keys({
                                text: Joi.string().min(3).max(50).required()
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
            handler: findAllQuestionsHandler,
            config: {
                auth: 'jwt',
                validate: {
                    params: {
                        themeid: Joi.string().alphanum()
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/themes/{themeid}/questions/{questionid}',
            handler: findOneQuestionHandler,
            config: {
                auth: 'jwt',
                validate: {
                    params: {
                        themeid: Joi.string().alphanum(),
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
                validate: {
                    params: {
                        themeid: Joi.string().alphanum(),
                        questionid: Joi.string().alphanum()
                    },
                    payload: {
                        name: Joi.string().min(2).max(20).required(),
                        correctOption: Joi.number().integer().valid([1, 2, 3, 4, 5]).required(),
                        options: Joi.array().length(5).items(
                            Joi.object().keys({
                                text: Joi.string().min(3).max(50).required()
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

        request.models.Theme.findById(request.params.themeid)
            .then((theme) => {

                if (!theme) {
                    reply(Boom.notFound());
                }

                let question = new request.models.Question(Hoek.merge(request.payload, {
                    user: request.auth.credentials.user._id,
                    theme: theme._id
                }));

                question.save()
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
    }

    function findAllQuestionsHandler(request, reply) {

        request.models.Theme.findById(request.params.themeid)
            .then((theme) => {

                if (!theme) {
                    reply(Boom.notFound());
                }

                request.models.Question.find({ theme: theme._id })
                    .then((entities) => {

                        if (!entities) {
                            reply({});
                        }

                        reply(entities);
                    })
                    .catch((err) => {

                        reply(Boom.wrap(err));
                    });
            })
            .catch((err) => {

                reply(Boom.wrap(err));
            });
    }

    function findOneQuestionHandler(request, reply) {

        request.models.Theme.findById(request.params.themeid)
            .then((theme) => {

                if (!theme) {
                    reply(Boom.notFound());
                }

                request.models.Question.findOne({ _id: request.params.questionid, theme: request.params.themeid })
                    .then((entity) => {

                        if (!entity) {
                            reply(Boom.notFound());
                        }

                        reply(entity);
                    })
                    .catch((err) => {

                        reply(Boom.wrap(err));
                    });
            })
            .catch((err) => {

                reply(Boom.wrap(err));
            });
    }

    function updateQuestionHandler(request, reply) {

        request.models.Theme.findById(request.params.themeid)
            .then((theme) => {

                if (!theme) {
                    reply(Boom.notFound());
                }

                request.models.Question.findOne({ _id: request.params.questionid, theme: request.params.themeid })
                    .then((entity) => {

                        if (!entity) {
                            reply(Boom.notFound());
                        }

                        entity.name = request.payload.name;
                        entity.correctOption = request.payload.correctOption;
                        entity.options = request.payload.options;

                        entity.save()
                            .then((entity) => {

                                reply(entity);
                            })
                            .catch((err) => {

                                reply(Boom.wrap(err));
                            })
                    })
                    .catch((err) => {

                        reply(Boom.wrap(err));
                    })
            })
            .catch((err) => {

                reply(Boom.wrap(err));
            })
    }

    function removeQuestionHandler(request, reply) {

        request.models.Theme.findById(request.params.themeid)
            .then((theme) => {

                if (!theme) {
                    reply(Boom.notFound());
                }

                request.models.Question.findOne({ _id: request.params.questionid, theme: request.params.themeid })
                    .then((entity) => {

                        if (!entity) {
                            reply(Boom.notFound());
                        }

                        entity.delete()
                            .then(() => {

                                reply(null);
                            })
                            .catch((err) => {

                                reply(Boom.wrap(err));
                            })
                    })
                    .catch((err) => {

                        reply(Boom.wrap(err));
                    })
            })
            .catch((err) => {

                reply(Boom.wrap(err));
            })
    }

    next();
};

exports.register.attributes = {
    name: 'questionController',
    version: '0.0.1'
};
