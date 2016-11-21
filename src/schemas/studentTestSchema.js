'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentTestSchema = new Schema({
    note: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    discipline: {
        type: String,
        required: true
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

studentTestSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.questions.forEach((q) => { delete q.correctOption });
    return obj;
};

studentTestSchema.plugin(require('mongoose-delete'), { deletedBy : true, deletedAt: true, overrideMethods: true });

module.exports = studentTestSchema;
