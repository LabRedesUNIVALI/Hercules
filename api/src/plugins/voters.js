'use strict';

exports.register = function(server, options, next) {

    const answerDecide = function (user, action, entity, cb) {

        options.answer.decide(user, action, entity, (err, result) => {
            return cb(err, result);
        });
    };

    const disciplineDecide = function (user, action, entity, cb) {

        options.discipline.decide(user, action, entity, (err, result) => {
            return cb(err, result);
        });
    };

    const questionDecide = function (user, action, entity, cb) {

        options.question.decide(user, action, entity, (err, result) => {
            return cb(err, result);
        });
    };

    const testDecide = function (user, action, entity, cb) {

        options.test.decide(user, action, entity, (err, result) => {
            return cb(err, result);
        });
    };

    const themeDecide = function (user, action, entity, cb) {

        options.theme.decide(user, action, entity, (err, result) => {
            return cb(err, result);
        });
    };

    server.method('answer.decide', answerDecide);
    server.method('discipline.decide', disciplineDecide);
    server.method('question.decide', questionDecide);
    server.method('test.decide', testDecide);
    server.method('theme.decide', themeDecide);

    next();
};

exports.register.attributes = {
    name: 'voters',
    version: '0.0.1'
};
