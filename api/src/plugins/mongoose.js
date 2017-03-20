'use strict';

const Mongoose = require('mongoose');
const Promise = require('promise');

exports.register = function (server, options, next){

    Mongoose.connect(options.mongodbUrl);

    //Mongoose's own promise lib is deprecated so i'm using promise as sugested.
    Mongoose.Promise = Promise;

    if (options.plugins) {
        options.plugins.forEach((plugin) => {
            Mongoose.plugin(
                require(plugin.require),
                plugin.options ? plugin.options : {}
            );
        });
    }

    server.decorate('server', 'mongoose', Mongoose);
    server.decorate('request', 'mongoose', Mongoose);

    next();

};

exports.register.attributes = {
    name: 'hercules-mongoose-connection',
    version: '0.0.1'
};
