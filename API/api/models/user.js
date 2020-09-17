const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : { 
        first: { type: String, required: true},
        last: { type: String, required: true}
    },
    email: {
        type: String, 
        required: true, 
        useCreateIndex: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    country: {type: String, required:true },
    password: { type: String, required:true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles', required: true }
});

module.exports = mongoose.model('User', userSchema);