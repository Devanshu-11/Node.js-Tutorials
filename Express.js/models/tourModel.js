const mongoose=require('mongoose');
const validator=require('validator');
const slugify=require('slugify');

// Creating the schema
const tourSchema=new mongoose.Schema({
    name:{
        type: String,

        // making a validation
        required: [true,"A Tour must have a name"],
        unique: true,

        // it removes leading and trailing spaces
        trim: true,
        maxlength: [40, 'A Tour name must have less than or equals to 40 characters'],
        minlength: [10, 'A Tour must have greater than or equals to 10 characters'],
        // validate: [validator.isAlpha, 'Tour name must only contains characters']
    },
    slug:{
        type: String,
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
        required: [true, "It should have a difficulty"],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty can be either easy, medium or difficult'
        }
    },
    ratingsAverage:{
        type: Number,

        // setting a default rating
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
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
        validate: {
            validator: function(val){

                // price discount should be lower than the actual price and this function is not going to work in update
                return val<this.price;
            },
            message: 'The discount price ({VALUE}) should be below the regular price' 
        }
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
    },
    secretTour: {
        // secret tour for true and for false, then it is not the secret tour
        type: Boolean,
        default: false,
    },
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

// Virtual Properties
tourSchema.virtual('durationWeeks').get(function (){
    return this.duration/7;
})

// Document middleware which will only runs for save() and create() mongoose method
tourSchema.pre('save', function(next){
    this.slug=slugify(this.name, {lower: true});
    next();
});


// tourSchema.pre('save', function(next){
//     console.log('Will save the document');
//     next();
// });

// tourSchema.post('save', function(doc, next){
//     console.log(doc);
//     next();
// });


// query middleware and this keyword will be pointed to current query, not to the current document
tourSchema.pre(/^find/, function(next){
    this.find({secretTour: {$ne: true}});

    this.start=Date.now();
    next();
});

// also specify a post middleware
// tourSchema.post(/^find/, function(docs, next){
//     console.log(docs);
//     console.log(`Query took ${Date.now()- this.start} in milliseconds`);
//     next();
// });


// Aggregation Middlewares- It allows us to add hooks before and after aggregation happens
tourSchema.pre('aggregate', function(next){
    this.pipeline().unshift({$match: {secretTour: {$ne: true}}});
    // console.log(this.pipeline());
    next();
});


// After Defining a schema, we will create model 
const Tour=mongoose.model('Tour', tourSchema);

// exports the file
module.exports=Tour;