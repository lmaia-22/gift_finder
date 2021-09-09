const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{ type: String, required:true },
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {
        type: String, 
        required: true, 
        useCreateIndex: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    country: {type: String, required:true },
    password: { type: String, required:true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles', required: true, default: 0 }
});

module.exports = mongoose.model('User', userSchema);