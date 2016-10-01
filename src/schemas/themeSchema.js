'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const themeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

themeSchema.post('save', (doc) => {

    if (doc.deleted) {
        mongoose.model('Question').delete({ theme: mongoose.Types.ObjectId(doc._id) }).exec();
    }
});

themeSchema.plugin(require('mongoose-delete'), { deletedBy : true, deletedAt: true, overrideMethods: true });

module.exports = themeSchema;
