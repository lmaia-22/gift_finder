const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true  },
});

module.exports = mongoose.model('Like', likeSchema);