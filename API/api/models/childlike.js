const mongoose = require('mongoose');

const childlikeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    like: { type: [mongoose.Schema.Types.ObjectId], ref: 'Like', required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true  },
    trust: { type: Number, min:0, max:10, required: false }
});

module.exports = mongoose.model('Childlike', childlikeSchema);