'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    beginDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    discipline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discipline'
    }
}, { timestamps: true });

testSchema.plugin(require('mongoose-delete'), { deletedBy : true, deletedAt: true, overrideMethods: true });

module.exports = testSchema;