'use strict';

const Boom = require('boom');

function findDiscipline(request, reply) {

    request.models.Discipline.findById(request.params.disciplineid)
        .then((entity) => {

            if (entity === null) {
                return reply(Boom.notFound());
            }

            return reply(entity);
        })
        .catch((err) => {

            return reply(Boom.wrap(err));
        });
}

function findQuestion(request, reply) {

    request.models.Question.findById(request.params.questionid)
        .then((entity) => {

            if (entity === null) {
                return reply(Boom.notFound());
            }

            return reply(entity);
        })
        .catch((err) => {

            return reply(Boom.wrap(err));
        });
}

function findTest(request, reply) {

    request.models.Test.findById(request.params.testid)
        .then((entity) => {

            if (entity === null) {
                return reply(Boom.notFound());
            }

            return reply(entity);
        })
        .catch((err) => {

            return reply(Boom.wrap(err));
        });
}

function findTheme(request, reply) {

    request.models.Theme.findById(request.params.themeid)
        .then((entity) => {

            if (entity === null) {
                return reply(Boom.notFound());
            }

            return reply(entity);
        })
        .catch((err) => {

            return reply(Boom.wrap(err));
        });
}

function findToken(request, reply) {

    request.models.Token.findById(request.params.tokenid)
        .then((entity) => {

            if (entity === null) {
                return reply(Boom.notFound());
            }

            return reply(entity);
        })
        .catch((err) => {

            return reply(Boom.wrap(err));
        });
}

module.exports = {
    findDiscipline: findDiscipline,
    findQuestion: findQuestion,
    findTest: findTest,
    findTheme: findTheme,
    findToken: findToken,
};
