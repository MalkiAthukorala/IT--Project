const mongoose = require('mongoose');



const inventorySchema = new mongoose.Schema({

   
     id: {
        type: String,
        required : true
    },
    name: {
        type: String,
        required : true
    },
    date: {
        type: Date,
        required : true
    },
    category: {
        type: String,
        required : true
    },
    quantity: {
        type: Number,
        required : true
    },

    
})

module.exports = mongoose.model("Inventory",inventorySchema);

