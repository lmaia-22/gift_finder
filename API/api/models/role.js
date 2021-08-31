const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : { type: String, required: true },
    rights:{ type: [mongoose.Schema.Types.ObjectId], ref: 'Rights', required: false },
    access: { type: [mongoose.Schema.Types.ObjectId], ref: 'Access', required: false }
});

module.exports = mongoose.model('Role', roleSchema);