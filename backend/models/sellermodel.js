const mongoose = require('mongoose');

const sellerSchema = mongoose.Schema({
    shippingInfo: {
        name:{
            type:String,
            required:true
        },
        address: {
            type: String,
            required: true
        },
        contactnumber:{
            type:Intl,
            required:true,
        }
       
    },
    
})

let sellerModel = mongoose.model('Seller', sellerSchema);

module.exports = sellerModel;