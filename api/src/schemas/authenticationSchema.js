'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authenticationSchema = new Schema({
    strategy: String,
    agent: String,
    ip: String,
}, { timestamps: true });

module.exports = authenticationSchema;
