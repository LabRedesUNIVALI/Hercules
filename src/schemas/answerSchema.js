'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    note: {
        type: String
    },
    hash: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
}, { timestamps: true });

answerSchema.plugin(require('mongoose-delete'), { deletedBy : true, deletedAt: true, overrideMethods: true });

module.exports = answerSchema;
