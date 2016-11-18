'use strict';

const Boom = require('boom');

exports.register = function (server, options, next) {

    server.auth.strategy('bearer', 'bearer-access-token', {
        validateFunc: function (token, cb) {

            const request = this;
            const date = new Date();

            request.models.Token.findOne({ value: token, expired: false })
                .populate('test')
                .then((entity) => {

                    if (!entity || date < entity.test.beginDate) {
                        return cb(Boom.unauthorized(), false, {});
                    }

                    if (date > entity.test.endDate) {
                        entity.expired = true;
                        entity.save();
                        return cb(Boom.unauthorized(), false, {})
                    }

                    request.auth.bearer = {
                        token: entity.value,
                        student: {
                            name: entity.student
                        },
                        test: {
                            _id: entity.test._id,
                            name: entity.test.name
                        }
                    };
                    return cb(null, true, { token: token });
                })
                .catch((err) => {

                    return cb(err, false, {});
                });
        }
    });

    next();
};

exports.register.attributes = {
    name: 'bearerAuthController',
    version: '0.0.1',
    once: true,
    dependencies: ['hapi-auth-bearer-token', 'hercules-mongoose-connection', 'hercules-models']
};
