const mongoose = require('mongoose');

const ageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    max_age:{ type: Number, required: true },
});

module.exports = mongoose.model('Age', ageSchema);