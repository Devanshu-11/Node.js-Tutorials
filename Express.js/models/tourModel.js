const mongoose=require('mongoose');

// Creating the schema
const tourSchema=new mongoose.Schema({
    name:{
        type: String,

        // making a validations
        required: [true,"A Tour must have a name"],
        unique: true
    },
    rating:{
        type: Number,

        // setting a default rating
        default: 4.5
    },
    price:{
        type: Number,
        required: [true,'A Tour must have a price']
    }
});

// After Defining a schema, we will create model 
const Tour = mongoose.model('Tour', tourSchema);

// exports the file
module.exports=Tour;