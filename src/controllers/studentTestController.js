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
        }
    ];

    server.route(routes);

    function getStudentTestHandler(request, reply) {

        request.models.Token.findById(request.auth.bearer.token._id)
            .then((entity) => {

                if (request.pre.studentTest !== null) {
                    entity.studentTest = {};
                    let questions = [];
                    request.pre.studentTest.questions.forEach((question) => {
                        questions.push({
                            name: question.name,
                            chosenOption: null,
                            correctOption: question.correctOption,
                            options: question.options
                        });
                    });
                    entity.studentTest.questions = questions;
                    entity.studentTest.student = entity.student;
                    entity.save();
                }

                entity.studentTest.questions.forEach((q) => { delete q.correctOption });
                return reply(entity.studentTest);
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
