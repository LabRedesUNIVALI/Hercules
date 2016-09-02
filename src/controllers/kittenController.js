'use strict';

const Joi = require('joi');
const mongoose = require('mongoose');

exports.register = function (server, options, next) {

    let routes = [
        {
            method: 'GET',
            path: '/kittens',
            handler: function (request, reply) {
                reply('Hello kittens');
            }
        },
        {
            method: 'GET',
            path: '/kittens/{name}',
            handler: function (request, reply) {
                let Kitten = mongoose.model('Kitten', { name: String });

                let kitty = new Kitten({ name: request.params.name });
                kitty.save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('meow');
                    }
                });


                reply('Are you a kitten ' + request.params.name + ', IF YOU ARE NOT A KITTEN I SAVED U IN MONGO ANYWAY MWHAHAHA');
            }
        }
    ];

    server.route(routes);

    next();

};

exports.register.attributes = {
    name: 'kittenController',
    version: '0.0.1'
};
