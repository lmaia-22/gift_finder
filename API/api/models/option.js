const mongoose = require('mongoose');

const filterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    filter: { type: mongoose.Schema.Types.ObjectId, ref: 'Filter', required: true },
    name: { type: String, required: true },
    value: {type: Number, required:true },
    createdAt: { type: date, default: Date.now },
    updatedAt: {type: date }
});

module.exports = mongoose.model('Filter', filterSchema);