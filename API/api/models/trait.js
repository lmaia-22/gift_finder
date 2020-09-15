const mongoose = require('mongoose');

const traitSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Trait', traitSchema);