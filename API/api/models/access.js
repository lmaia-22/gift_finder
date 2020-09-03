const mongoose = require('mongoose');

const rightsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : { type: String, required: true },
    path:{ type: String },
    url:{ type: String }
});

module.exports = mongoose.model('Rights', rightsSchema);