'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = require('./studentSchema');

const disciplineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
        required: true
    },
    students: [ studentSchema ]
}, { timestamps: true });

disciplineSchema.plugin(require('mongoose-delete'), { deletedBy : true, deletedAt: true, overrideMethods: true });

module.exports = disciplineSchema;
