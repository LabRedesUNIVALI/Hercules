'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    value: {
        type: String,
        required: true
    },
    expired: {
        type: Boolean,
        default: false
    },
    student: {
        type: String,
        required: true
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    }
}, { timestamps: true });

tokenSchema.plugin(require('mongoose-delete'), { deletedBy : true, deletedAt: true, overrideMethods: true });

module.exports = tokenSchema;
