const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    current_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name : { type: String, required: true },
    age_filter: {type: mongoose.Schema.Types.ObjectId, ref: 'Age', required: true },
    gender_filter: {type: mongoose.Schema.Types.ObjectId, ref: 'Gender', required: true },
    job_filter: {type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    type_of_gift: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
    event_of_gift: { type: [mongoose.Schema.Types.ObjectId], ref: 'Event', required: true },
    receiver_likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'Like', required: true },
    trust_likes: { type: Number, min:0, max:10, required: true },
    receiver_likes_of_childLikes: { type: [mongoose.Schema.Types.ObjectId], ref: 'Childlike', required: true },
    trust_likes_of_childLikes: { type: Number, min:0, max:10, required: true },
    average_price: { type: Number, required:true }
});

module.exports = mongoose.model('Product', productSchema);