const mongoose = require('mongoose');

var ProductObject =  { 
    productId: Number, 
    name: String, 
    price: Number,
    duration: Number,
    fabricPlanId: Number
};

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: ProductObject,
    quantity: { type: Number, required: true },
    status: {type: String, default: 'Created'},
    changestatusorder: {type: Date, default: Date.now},
    date: {type: Date, default: Date.now},
    estimateddeliverydate: {type: Date}
});

module.exports = mongoose.model('Order', orderSchema);