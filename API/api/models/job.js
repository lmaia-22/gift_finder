const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description:{ type: String, required: true },
    field: { type: String, required:true },
    level: { type: String, required:true }
});

module.exports = mongoose.model('Job', jobSchema);