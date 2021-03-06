const mongoose = require('mongoose');

const typeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true }
});

module.exports = mongoose.model('Type', typeSchema);