const mongoose=require('mongoose');

// Creating the schema
const tourSchema=new mongoose.Schema({
    name:{
        type: String,

        // making a validations
        required: [true,"A Tour must have a name"],
        unique: true
    },
    duration:{
        type: Number,
        required: [true, "A tour must have a duration"],
    },
    maxGroupSize:{
        type: Number,
        required: [true, "A tour must have a group size"],
    },
    difficulty:{
        type: String,
        required: [true, "It should have a difficulty"]
    },
    ratingsAverage:{
        type: Number,

        // setting a default rating
        default: 4.5
    },
    ratingsQuantity:{
        type: Number,
        default: 0,
    },
    price:{
        type: Number,
        required: [true,'A Tour must have a price']
    },
    priceDiscount:{
        type: Number,
    },
    summary:{
        type: String,

        // removes leading and trailing whitespace 
        trim: true,
        required: [true, "A tour must have a summary"]
    },
    description:{
        type: String,
        trim: true,
    },
    imageCover:{
        type: String,
        required: [true, "A tour must have a cover image"]
    },
    images:{
        // define the array of strings
        type: [String],
    },

    // time stamp
    createdAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
    startDates:{
        type: [Date],
    }
});

// After Defining a schema, we will create model 
const Tour=mongoose.model('Tour', tourSchema);

// exports the file
module.exports=Tour;