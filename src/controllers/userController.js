'use strict';

const Joi = require('joi');
const mongoose = require('mongoose');
const Boom = require('boom');

exports.register = function (server, options, next) {

    const routes = [
        {
            method: 'POST',
            path: '/register',
            handler: createUserHandler,
            config: {
                validate: {
                    payload: {
                        name: Joi.string().min(2).max(50).required(),
                        email: Joi.string().email().required(),
                        password: Joi.string().min(5).max(50).required()
                    }
                }
            }
        },
        {
            method: 'POST',
            path: '/email/check',
            handler: checkEmailHandler
        },
        {
            method: 'GET',
            path: '/profile/me',
            handler: findMeHandler,
            config: {
                auth: 'jwt'
            }
        },
        {
            method: 'PUT',
            path: '/reset-password',
            handler: resetPasswordHandler,
            config: {
                auth: 'jwt',
                validate: {
                    payload: {
                        password: Joi.string().min(5).max(50).required(),
                        repeatPassword: Joi.string().min(5).max(50).required(),
                        newPassword: Joi.string().min(5).max(50).required()
                    }
                }
            }
        }
    ];

    server.route(routes);

    function createUserHandler(request, reply) {

        request.models.User.create(request.payload)
            .then((entity) => {

               reply(entity);
            })
            .catch((err) => {

                reply(Boom.wrap(err));
            });
    }

    function checkEmailHandler(request, reply) {

        request.models.User.findOne({ email: request.payload.email }, 'email')
            .then((email) => {
                reply({
                    isUnique: (email) ? false : true
                });
            })
            .catch((err) => {
                reply(Boom.wrap(err));
            });
    }

    function findMeHandler(request, reply) {

        request.models.User.findById(request.auth.credentials.user._id)
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

    function resetPasswordHandler(request, reply) {

        request.models.User.findById(request.auth.credentials.user._id)
            .then((entity) => {

                if (!entity.verifyPasswordSync(request.payload.password)) {
                    reply (Boom.unauthorized());
                }

                if (request.payload.password !== request.payload.repeatPassword) {
                    reply (Boom.unauthorized());
                }

                entity.password = request.payload.password;
                entity.save()
                    .then((entity) => {

                        reply(entity);
                    })
                    .catch((err) => {

                        reply (Boom.wrap(err));
                    });

            })
            .catch((err) => {

                reply(Boom.wrap(err));
            });
    }

    next();
};

exports.register.attributes = {
    name: 'userController',
    version: '0.0.1'
};
