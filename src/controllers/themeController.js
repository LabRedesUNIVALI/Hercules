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
            path: '/themes',
            handler: createThemeHandler,
            config: {
                auth: 'jwt',
                validate: {
                    payload: {
                        name: Joi.string().min(2).max(255).required()
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/themes',
            handler: findAllThemesHandler,
            config: {
                auth: 'jwt'
            }
        },
        {
            method: 'GET',
            path: '/themes/{themeid}',
            handler: findOneThemeHandler,
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
            method: 'PUT',
            path: '/themes/{themeid}',
            handler: updateThemeHandler,
            config: {
                auth: 'jwt',
                pre: [
                    { method: PreMethods.findTheme, assign: 'theme' }
                ],
                validate: {
                    params: {
                        themeid: Joi.string().alphanum()
                    },
                    payload: {
                        name: Joi.string().min(2).max(255).required()
                    }
                }
            }
        },
        {
            method: 'DELETE',
            path: '/themes/{themeid}',
            handler: removeThemeHandler,
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
        }
    ];

    server.route(routes);

    function createThemeHandler(request, reply) {

        request.server.methods.theme.decide(request.auth.credentials.user, 'CREATE', null, (err, authorized) => {

            if (err) {
                return reply(Boom.wrap(err));
            }

            if (!authorized) {
                return reply(Boom.forbidden());
            }

            let theme = new request.models.Theme(Hoek.merge(request.payload, {
                user: request.auth.credentials.user._id
            }));

            theme.save()
                .then((entity) => {

                    return reply(entity);
                })
                .catch((err) => {

                    return reply(Boom.wrap(err));
                });
        });
    }

    function findAllThemesHandler(request, reply) {

        request.models.Theme.find({ user: request.auth.credentials.user._id })
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

    function findOneThemeHandler(request, reply) {

        request.models.Theme.findById(request.params.themeid)
            .then((entity) => {

                if (!entity) {
                    return reply(Boom.notFound());
                }

                request.server.methods.theme.decide(request.auth.credentials.user, 'VIEW', entity, (err, authorized) => {

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

    function updateThemeHandler(request, reply) {

        request.server.methods.theme.decide(request.auth.credentials.user, 'UPDATE', request.pre.theme, (err, authorized) => {

            if (err) {
                return reply(Boom.wrap(err));
            }

            if (!authorized) {
                return reply(Boom.forbidden());
            }

            request.pre.theme.name = request.payload.name;

            request.pre.theme.save()
                .then((entity) => {

                    return reply(entity);
                })
                .catch((err) => {

                    return reply(Boom.wrap(err));
                })
        });
    }

    function removeThemeHandler(request, reply) {

        request.server.methods.theme.decide(request.auth.credentials.user, 'REMOVE', request.pre.theme, (err, authorized) => {

            if (err) {
                return reply(Boom.wrap(err));
            }

            if (!authorized) {
                return reply(Boom.forbidden());
            }

            request.pre.theme.delete()
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
    name: 'themeController',
    version: '0.0.1'
};
