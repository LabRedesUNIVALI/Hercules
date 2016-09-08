'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        index: true,
        unique: true
    },
    password: {
        type: String,
        bcrypt: true
    },
    theme: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theme'
    }]
}, { timestamps: true });

userSchema.plugin(require('mongoose-delete'), { deletedBy : true, deletedAt: true, overrideMethods: true });
userSchema.plugin(require('mongoose-beautiful-unique-validation'));
userSchema.plugin(require('mongoose-bcrypt'), {rounds: 8});

module.exports = userSchema;
