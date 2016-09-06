'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    beginDate: {
        type: Boolean,
         default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    }
}, { timestamps: true });

tokenSchema.plugin(require('mongoose-delete'), { deletedBy : true, deletedAt: true, overrideMethods: true });

module.exports = tokenSchema;