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
            path: '/disciplines',
            handler: createDisciplineHandler,
            config: {
                auth: 'jwt',
                validate: {
                    payload: {
                        name: Joi.string().min(2).max(255).required(),
                        year: Joi.number().integer().min(1900).required(),
                        semester: Joi.number().integer().valid([1, 2]).required(),
                        students: Joi.array().items(
                            Joi.object().keys({
                                name: Joi.string().min(2).max(255).required()
                            })
                        )
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/disciplines',
            handler: findAllDisciplinesHandler,
            config: {
                auth: 'jwt'
            }
        },
        {
            method: 'GET',
            path: '/disciplines/{disciplineid}',
            handler: findOneDisciplineHandler,
            config: {
                auth: 'jwt',
                validate: {
                    params: {
                        disciplineid: Joi.string().alphanum()
                    }
                }
            }
        },
        {
            method: 'PUT',
            path: '/disciplines/{disciplineid}',
            handler: updateDisciplineHandler,
            config: {
                auth: 'jwt',
                pre: [
                    { method: PreMethods.findDiscipline, assign: 'discipline' }
                ],
                validate: {
                    params: {
                        disciplineid: Joi.string().alphanum()
                    },
                    payload: {
                        name: Joi.string().min(2).max(255).required(),
                        year: Joi.number().integer().min(1900).required(),
                        semester: Joi.number().integer().valid([1, 2]).required(),
                        students: Joi.array().items(
                            Joi.object().keys({
                                name: Joi.string().min(2).max(255).required()
                            })
                        )
                    }
                }
            }
        },
        {
            method: 'DELETE',
            path: '/disciplines/{disciplineid}',
            handler: removeDisciplineHandler,
            config: {
                auth: 'jwt',
                pre: [
                    { method: PreMethods.findDiscipline, assign: 'discipline' }
                ],
                validate: {
                    params: {
                        disciplineid: Joi.string().alphanum()
                    }
                }
            }
        }
    ];

    server.route(routes);

    function createDisciplineHandler(request, reply) {

        request.server.methods.discipline.decide(request.auth.credentials.user, 'CREATE', null, (err, authorized) => {

            if (err) {
                return reply(Boom.wrap(err));
            }

            if (!authorized) {
                return reply(Boom.forbidden());
            }

            let discipline = new request.models.Discipline(Hoek.merge(request.payload, {
                user: request.auth.credentials.user._id
            }));

            discipline.save()
                .then((entity) => {

                    return reply(entity);
                })
                .catch((err) => {

                    return reply(Boom.wrap(err));
                });
        });
    }

    function findAllDisciplinesHandler(request, reply) {

        request.models.Discipline.find({ user: request.auth.credentials.user._id })
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

    function findOneDisciplineHandler(request, reply) {

        request.models.Discipline.findById(request.params.disciplineid)
            .then((entity) => {

                if (!entity) {
                    return reply(Boom.notFound());
                }

                request.server.methods.discipline.decide(request.auth.credentials.user, 'VIEW', entity, (err, authorized) => {

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

    function updateDisciplineHandler(request, reply) {

        request.server.methods.discipline.decide(request.auth.credentials.user, 'UPDATE', request.pre.discipline, (err, authorized) => {

            if (err) {
                return reply(Boom.wrap(err));
            }

            if (!authorized) {
                return reply(Boom.forbidden());
            }

            request.pre.discipline.name = request.payload.name;
            request.pre.discipline.year = request.payload.year;
            request.pre.discipline.semester = request.payload.semester;
            request.pre.discipline.students = request.payload.students;

            request.pre.discipline.save()
                .then((entity) => {

                    return reply(entity);
                })
                .catch((err) => {

                    return reply(Boom.wrap(err));
                });
        });
    }

    function removeDisciplineHandler(request, reply) {

        request.server.methods.discipline.decide(request.auth.credentials.user, 'REMOVE', request.pre.discipline, (err, authorized) => {

            if (err) {
                return reply(Boom.wrap(err));
            }

            if (!authorized) {
                return reply(Boom.forbidden());
            }

            request.pre.discipline.delete()
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
    name: 'disciplineController',
    version: '0.0.1'
};
