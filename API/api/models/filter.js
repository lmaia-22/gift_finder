const mongoose = require('mongoose');

const filterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: {type:String, required:true },
    active: { type: Boolean, default: true },
    options: { type: [mongoose.Schema.Types.ObjectId], ref: 'Options', required: true },
    createdAt: { type: date, default: Date.now },
    updatedAt: {type: date } 
});

module.exports = mongoose.model('Filter', filterSchema);