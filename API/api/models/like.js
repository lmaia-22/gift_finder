const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    trust: { type: Number, min:0, max:10, required: false }
});

module.exports = mongoose.model('Like', likeSchema);