'use strict';

const mongoose = require('mongoose');

exports.register = function(server, options, next) {

    let models = [];

    for (let i in options.models) {
        models[options.models[i].name] = mongoose.model(options.models[i].name, options.models[i].schema);
    }

    server.decorate('server', 'models', models);
    server.decorate('request', 'models', models);

    next();
};

exports.register.attributes = {
    name: 'hercules-models',
    version: '0.0.1',
    dependencies: 'hercules-mongoose-connection'
};