'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = optionSchema;
