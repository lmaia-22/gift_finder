const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    current_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name : { 
        first: { type: String, required: true},
        last: { type: String, required: true}
    },
    amount_to_spend: { type:Number, required:false },
    age_filter: {type: mongoose.Schema.Types.ObjectId, ref: 'Age', required: true },
    gender_filter: {type: mongoose.Schema.Types.ObjectId, ref: 'Gender', required: true },
    job_filter: {type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    type_of_gift: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
    event_of_gift: { type: [mongoose.Schema.Types.ObjectId], ref: 'Event', required: true },
    receiver_likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'Like', required: true },
    receiver_likes_of_likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'Childlike', required: true },
    product: {type: [mongoose.Schema.Types.ObjectId], ref: 'Product', required: true },
    location: {type: String ,required:true },
    timestamp: { type : Date, default: Date.now, required:true }
});

module.exports = mongoose.model('Request', requestSchema);