'use strict';

const Joi = require('joi');
const mongoose = require('mongoose');
// const Boom = require('boom');

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
                        username: Joi.string().min(2).max(20).required(),
                        email: Joi.string().email().required(),
                        password: Joi.string().min(5).max(50).required()
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
                reply(err);
                // reply(Boom.wrap(err));
            });
    }

    next();
};

exports.register.attributes = {
    name: 'userController',
    version: '0.0.1'
};
