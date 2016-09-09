'use strict';

const Joi = require('joi');
const mongoose = require('mongoose');
const Boom = require('boom');

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
                        name: Joi.string().min(2).max(20).required()
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
                validate: {
                    params: {
                        themeid: Joi.string().alphanum()
                    },
                    payload: {
                        name: Joi.string().min(2).max(20).required()
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

        const entity = new request.models.Theme(request.payload);
        entity.user = request.auth.credentials.user._id;

        entity.save()
            .then((entity) => {

                reply(entity);
            })
            .catch((err) => {

                reply(Boom.wrap(err));
            });
    }

    function findAllThemesHandler(request, reply) {

        request.models.Theme.find({})
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

    function findOneThemeHandler(request, reply) {

        request.models.Theme.findById(request.params.themeid)
            .then((entity) => {

                if (!entity) {
                    reply(Boom.notFound());
                }

                reply(entity);
            })
            .catch((err) => {

                reply(Boom.wrap(err));
            });
    }

    function updateThemeHandler(request, reply) {

        request.models.Theme.findById(request.params.themeid)
            .then((entity) => {

                if (!entity) {
                    reply(Boom.notFound());
                }

                entity.name = request.payload.name;

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
    }

    function removeThemeHandler(request, reply) {

        request.models.Theme.findById(request.params.themeid)
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
    }

    next();
};

exports.register.attributes = {
    name: 'themeController',
    version: '0.0.1'
};
