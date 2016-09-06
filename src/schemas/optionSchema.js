'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });

optionSchema.plugin(require('mongoose-delete'), { deletedBy : true, deletedAt: true, overrideMethods: true });

module.exports = optionSchema;