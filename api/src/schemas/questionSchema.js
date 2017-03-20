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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    options: [ optionSchema ]
}, { timestamps: true });

questionSchema.methods.hasAnyTestInProgress = function (question, cb) {

    this.model('Test').find({
        beginDate: { $lte: new Date() },
        endDate: { $gte: new Date() },
        questions: question._id
    })
        .then((entities) => {

            if (entities === null) {
                return cb(null, false);
            }

            return cb(null, entities.length > 0);
        })
        .catch((err) => {

            return cb(err, false);
        });
};

questionSchema.plugin(require('mongoose-delete'), { deletedBy : true, deletedAt: true, overrideMethods: true });

module.exports = questionSchema;
