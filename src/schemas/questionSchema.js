'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    correctOption: {
        type: String
    },
    chosenOption: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    theme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theme'
    }
}, { timestamps: true });

questionSchema.plugin(require('mongoose-delete'), { deletedBy : true, deletedAt: true, overrideMethods: true });

module.exports = questionSchema;
