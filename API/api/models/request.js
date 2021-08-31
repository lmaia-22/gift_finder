const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    current_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name : { 
        first: { type: String, required: true},
        last: { type: String, required: true}
    },
    amount_to_spend: { type:Number, required:false },
    age: {type: mongoose.Schema.Types.ObjectId, ref: 'Age', required: true },
    gender: {type: mongoose.Schema.Types.ObjectId, ref: 'Gender', required: true },
    job: {type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    trait: {type: mongoose.Schema.Types.ObjectId, ref: 'Trait', required: true },
    like: {type: mongoose.Schema.Types.ObjectId, ref: 'Like', required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
    event: { type: [mongoose.Schema.Types.ObjectId], ref: 'Event', required: true },
    location: {type: String ,required:true },
    timestamp: { type : Date, default: Date.now, required:true }
});

module.exports = mongoose.model('Request', requestSchema);