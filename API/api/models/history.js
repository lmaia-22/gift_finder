const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    result: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    filters: { type: [mongoose.Schema.Types.ObjectId], ref: 'Filter', required: true }
});

module.exports = mongoose.model('History', historySchema);