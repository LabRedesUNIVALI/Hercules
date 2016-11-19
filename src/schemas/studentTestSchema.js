'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentTestSchema = new Schema({
    note: {
        type: String
    },
    student: {
        type: String,
        required: true
    },
    questions: [{
        type: Schema.Types.Mixed,
        required: true
    }]
}, { timestamps: true });

studentTestSchema.plugin(require('mongoose-delete'), { deletedBy : true, deletedAt: true, overrideMethods: true });

module.exports = studentTestSchema;
