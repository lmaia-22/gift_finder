const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : { type: String, required: true },
    description: { type: String, required: true },
    filters:{
        age: [{
            age_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Age', required: true }
        }],
        gender: [{
            gender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Gender', required: true  }
        }],
        job: [{
            job_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
        }],
        traits:[{
            trait: {type: mongoose.Schema.Types.ObjectId, ref: 'Trait', required: true },
            percentage: { type: Number, required: true}
        }],
        type: [{ 
            type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
        }],
        event: [{ 
            event_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
        }],
        average_price: { 
            min: {type: Number, required:true },
            max: {type: Number, required:true }
        }
    }
});

module.exports = mongoose.model('Product', productSchema);