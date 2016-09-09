'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const authenticationSchema = require('./authenticationSchema');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        bcrypt: true
    },
    themes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theme'
    }],
    authentications: [ authenticationSchema ]
}, { timestamps: true });

userSchema.plugin(require('mongoose-bcrypt'), { rounds: 8 });
userSchema.plugin(require('mongoose-delete'), { deletedBy : true, deletedAt: true, overrideMethods: true });
userSchema.plugin(require('mongoose-beautiful-unique-validation'));

module.exports = userSchema;
