const Rules = {
    admin: 0,
    client: 1
}

const ActionsDefault = {
    NewOrder: 1,
    ViewOrder: 1,
    EditOrder: 0,
    EditClientAdmin: 0,
    EditClient: 1
}

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
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles', required: true, default: 0 }
});

module.exports = mongoose.model('User', userSchema);