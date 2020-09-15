const mongoose = require('mongoose');

const genderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true }
});

module.exports = mongoose.model('Gender', genderSchema);