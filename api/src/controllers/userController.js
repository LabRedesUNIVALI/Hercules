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
                        name: Joi.string().min(2).max(255).required(),
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
                        newPassword: Joi.string().min(5).max(50).required(),
                        repeatNewPassword: Joi.string().min(5).max(50).required()
                    }
                }
            }
        }
    ];

    server.route(routes);

    function createUserHandler(request, reply) {

        request.models.User.create(request.payload)
            .then((entity) => {

               return reply(entity);
            })
            .catch((err) => {

                return reply(Boom.wrap(err));
            });
    }

    function checkEmailHandler(request, reply) {

        request.models.User.findOne({ email: request.payload.email }, 'email')
            .then((email) => {
                return reply({
                    isUnique: (email) ? false : true
                });
            })
            .catch((err) => {
                return reply(Boom.wrap(err));
            });
    }

    function findMeHandler(request, reply) {

        request.models.User.findById(request.auth.credentials.user._id)
            .then((entity) => {

                if (!entity) {
                    return reply(Boom.notFound());
                }

                return reply(entity);
            })
            .catch((err) => {

                return reply(Boom.wrap(err));
            });
    }

    function resetPasswordHandler(request, reply) {

        request.models.User.findById(request.auth.credentials.user._id)
            .then((entity) => {

                if (!entity.verifyPasswordSync(request.payload.password)) {
                    reply (Boom.unauthorized());
                }

                if (request.payload.newPassword !== request.payload.repeatNewPassword) {
                    reply (Boom.unauthorized());
                }

                entity.password = request.payload.newPassword;
                entity.save()
                    .then((entity) => {

                        return reply(entity);
                    })
                    .catch((err) => {

                        reply (Boom.wrap(err));
                    });

            })
            .catch((err) => {

                return reply(Boom.wrap(err));
            });
    }

    next();
};

exports.register.attributes = {
    name: 'userController',
    version: '0.0.1'
};
