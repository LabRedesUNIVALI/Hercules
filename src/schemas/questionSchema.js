'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const optionSchema = require('./optionSchema');

const questionSchema = new Schema({
    correctOption: {
        type: String,
        required: true
    },
    chosenOption: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    theme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theme'
    },
    options: [ optionSchema ]
}, { timestamps: true });

questionSchema.plugin(require('mongoose-delete'), { deletedBy : true, deletedAt: true, overrideMethods: true });

module.exports = questionSchema;
