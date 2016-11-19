'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    optionNumber: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = optionSchema;
