const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    current_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name : { 
        first: { type: String, required: true},
        last: { type: String, required: true}
    },
    age_filter: {type: mongoose.Schema.Types.ObjectId, ref: 'Age', required: true },
    gender_filter: {type: mongoose.Schema.Types.ObjectId, ref: 'Gender', required: true },
    job_filter: {type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    type_of_gift_filter: { type: mongoose.Schema.Types.ObjectId, ref: 'Type_gift', required: true },
    event_of_gift_filter: { type: mongoose.Schema.Types.ObjectId, ref: 'Event_gift', required: true },
    receiver_likes_filter: { type: mongoose.Schema.Types.ObjectId, ref: 'Likes', required: true },
    receiver_likes_of_likes_filter: { type: mongoose.Schema.Types.ObjectId, ref: 'Likes_of_Likes', required: true },
    product: {type: [mongoose.Schema.Types.ObjectId], ref: 'Product', required: true },
    location: {type: String, required:true },
    timestamp: { type : Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);