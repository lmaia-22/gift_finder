const mongoose = require('mongoose');

var ProductObject =  { 
    name: String, 
    price: Number,
};

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: ProductObject,
    quantity: { type: Number, required: false },
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', orderSchema);