'use strict';

const Joi = require('joi');
const Boom = require('boom');
const PreMethods = require('../utils/preMethods');

exports.register = function (server, options, next) {

    const routes = [
        {
            method: 'GET',
            path: '/student/test',
            config: {
                auth: 'bearer',
                pre: [
                    { method: PreMethods.findStudentTestInitialState, assign: 'studentTest' }
                ]
            },
            handler: getStudentTestHandler
        },
        {
            method: 'PUT',
            path: '/student/test/question/{questionid}',
            handler: insertQuestionHandler,
            config: {
                auth: 'bearer',
                validate: {
                    payload: {
                        chosenOption: Joi.number().integer().valid([1, 2, 3, 4, 5]).required(),
                    },
                    params: {
                        questionid: Joi.string().alphanum()
                    }
                }
            }
        },
        {
            method: 'post',
            path: '/student/test',
            handler: finishStudentTestHandler,
            config: {
                auth: 'bearer'
            }
        }
    ];

    server.route(routes);

    function getStudentTestHandler(request, reply) {

        request.models.Token.findById(request.auth.bearer.token._id)
            .then((entity) => {

                request.models.Test.findById(entity.test)
                    .populate('user discipline')
                    .then((test) => {

                        if (request.pre.studentTest !== null) {
                            entity.studentTest = {};
                            let questions = [];
                            request.pre.studentTest.questions.forEach((question) => {
                                questions.push({
                                    _id: question._id,
                                    name: question.name,
                                    chosenOption: null,
                                    correctOption: question.correctOption,
                                    options: question.options
                                });
                            });
                            entity.studentTest.name = test.name;
                            entity.studentTest.discipline = test.discipline.name;
                            entity.studentTest.teacher = test.user.name;
                            entity.studentTest.questions = questions;
                            entity.studentTest.student = entity.student;
                            entity.save();
                        }

                        return reply(entity.studentTest);
                    });
            })
            .catch((err) => {

                return reply(Boom.wrap(err));
            });
    }

    function insertQuestionHandler(request, reply) {

        request.models.Token.findById(request.auth.bearer.token._id)
            .then((entity) => {

                entity.studentTest.questions.forEach((question) => {

                    if (question._id.toString() === request.params.questionid) {
                        question.chosenOption = request.payload.chosenOption.toString();
                        entity.studentTest.markModified('questions');
                    }
                });

                entity.save();
                return reply();
            })
            .catch((err) => {

                return reply(Boom.wrap(err));
            });
    }

    function finishStudentTestHandler(request, reply) {

        request.models.Token.findById(request.auth.bearer.token._id)
            .then((entity) => {

                entity.studentTest.note = 0;
                entity.studentTest.questions.forEach((question) => {

                    if (question.correctOption === question.chosenOption) {
                        entity.studentTest.note = entity.studentTest.note + (10 / entity.studentTest.questions.length)
                    }
                });

                entity.expired = true;
                entity.save();
                return reply().code(201);
            })
            .catch((err) => {

                return reply(Boom.wrap(err));
            });
    }

    next();
};

exports.register.attributes = {
    name: 'studentTestController',
    version: '0.0.1'
};
