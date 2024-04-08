const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            image: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"],
        enum: {
            values: [
                'Stainless Steel',
                'Aluminium',
                'Non Stick',
                'Cast iron',
                'Cutleries',
                'Copper',
                'Wood',
                'Brass'
            ],
            message : "Please select correct category"
        }
    },
    // defaultseller: {
    //     type: String,
    //     required: [true, "Please enter seller"],
    //     enum: {
    //         values: [
    //             'Subiksha',
    //             'Karthik Rajan',
    //             'Suriya',
    //             'Kiruthiga S',
    //             'others'
    //         ],
    //         message : "Please select correct seller"
    //     }
    // },
    
    
    
    seller: {
        type: String,
        //required: [true, "Please enter product seller"]
    },
     selleraddress: {
        type: String,
        // required: [true, "Please enter product seller address"]
     },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [20, 'Product stock cannot exceed 20']
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type : mongoose.Schema.Types.ObjectId
    }
    ,
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

    // productReducer.js

// const initialState = {
//     // ... other state properties
//     defaultsellers: [
//       'Subiksha',
//       'Karthik Rajan',
//       'Suriya',
//       'Kiruthiga S',
//       'others',
//     ],
//   };
  


// Calculate aggregated ratings for each seller
const sellerRatings = {};
// products.forEach((product) => {
//   const sellerName = product.seller.name; // Adjust this to your data structure
//   const productRating = product.ratings;

//   if (sellerRatings[sellerName]) {
//     sellerRatings[sellerName].totalRatings += productRating;
//     sellerRatings[sellerName].productCount++;
//   } else {
//     sellerRatings[sellerName] = {
//       totalRatings: productRating,
//       productCount: 1,
//     };
//   }
// });

// // Now, you have sellerRatings object with aggregated ratings for each seller

  
let schema = mongoose.model('Product', productSchema)

module.exports = schema