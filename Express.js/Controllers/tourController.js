const fs=require('fs');
const Tour=require('../models/tourModel');
const qs=require('qs');

// get method
const tours=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`,'utf-8')); // we want that it should be read only one time and Json.parse is converting the Json formatting string into the javascript object and Json.stringify converts javascript object into Json formatting string

// Another Middleware
exports.aliasTopTours=(req,res,next)=>{
    req.query.limit='5';
    req.query.sort='ratingsAverage, price';
    req.query.fields='name, price, ratingsAverage, summary, difficulty';
    next();
}

// creating a param middleware function
exports.checkId=(req,res,next, val)=>{
    console.log(`Tour Id is ${val}`);

    // converting the string to a number
    const id=req.params.id*1;
    if(id>tours.length-1){
        return res.status(404).json({
            status: 'Failed',
            message: 'Invalid Id'
        });
    }
    next();
}

// middleware function
exports.checkBody=(req,res,next)=>{
    if(!req.body.name|| !req.body.price){
        return res.status(400).json({
            status: 'Failed',
            message: 'Missing name or price'
        });
    }
    next();
}

// to get all the tours
// exports.getAllTours=(req,res)=>{
//     console.log(req.requestTime);

//     res.status(200).json({
//         status: 'success',
//         requestedAt: req.requestTime,
//         results: tours.length,
//         data: {
//             tours,
//         }
//     });
// };


// get particular tour by id
// exports.getTourById=(req,res)=>{
//     const id = req.params.id * 1;

//     // Searching for the tour with matching id
//     const tour=tours.find(el=>el.id===id);

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour,
//         }
//     });
// };


// Posting the particular tour
// exports.postTour=(req,res)=>{

//     // creating the id by accessing the previous id and then increment it
//     const newId=tours[tours.length-1].id+1;

//     // Then creating the object by combining id with the data from client request
//     const newTour= Object.assign ({id: newId}, req.body);

//     // push this tour into tours array
//     tours.push(newTour);

//     // Writing to file synchronously
//     fs.writeFileSync(`${__dirname}/../dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 newTour,
//             }
//         });
//     });

//     res.status(200).json({
//         status: 'success',
//         message: 'Executed Successfully'
//     });
// };


// Update a particular tour by id
// exports.UpdateTourById=(req,res)=>{
//     res.status(200).json({
//         status: 'Success',
//         data: {
//             tour:'<Updated Tour>'
//         }
//     });
// };


// delete tour by id
// exports.deleteTourById=(req,res)=>{
//     res.status(204).json({
//         status: 'Success',
//         data: null,
//     });
// };


// Implement the crud operations and To create the database
exports.createTour=async(req,res)=>{
    try{

        // it creates a new Document in the database
        const newTour=await Tour.create(req.body);

        res.status(201).json({
            status: 'Success',
            data: {
                tour: newTour
            }
        });

    }catch(error){
        res.status(400).json({
            status: 'Failed',
            message: error,
        })
    }
}

// to get all the tours
exports.getAllTours=async(req,res)=>{
    try{
        // Parse the query string for nested filtering (e.g. duration[gte]=5)
        const parsedQuery=qs.parse(req.query);

        // extract all query parameters from the request
        const queryObj={...req.query};

        // fields not be included in the query object
        const excludeFields=['page','sort', 'limit','fields'];

        // remove it by using for each
        excludeFields.forEach(el=>delete parsedQuery[el]);

        // Advanced Filtering and Json.stringfy converts the javascript object into the Json string
        let queryStr=JSON.stringify(parsedQuery);
        queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        // Json.parse converts the Json string into the javascript object
        console.log(JSON.parse(queryStr));

        // execute the query
        let query = Tour.find(JSON.parse(queryStr));

        // Now we will implementing the sorting
        if(req.query.sort){
            const sortBy=req.query.sort.split(',').join(' ');
            console.log("Sort By: ",sortBy);
            query=query.sort(req.query.sort);
        }else{
            query=query.sort('-createdAt');
        }

        // Field Limiting
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            console.log("The Fields are: ",fields);
            query=query.select(fields);
        }else{
            // we use (-) to exclude it
            query=query.select('-__v')
        }

        // Pagination
        const page=req.query.page*1||1;
        const limit=req.query.limit*1||10;
        const skip=(page-1)*limit;

        // Now we will execute the query
        query=query.skip(skip).limit(limit);

        // Validation
        if(req.query.page){
            const numberOfTours=await Tour.countDocuments();
            if(skip>=numberOfTours){
                throw new Error('This Page does not exists');
            }
        }

        // Execute the query to get the tours
        const tours = await query;

        res.status(200).json({
            status: 'Success',
            results: tours.length,
            data:{
                tours,
            }
        });

    }catch(error){
        res.status(404).json({
            status: 'failed',
            message: error,
        })
    }    
};

// to get the particular tour
exports.getTourById=async(req,res)=>{
    try{
        // to get the tour according to the id and here, we get the id from the database
        const tour=await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data:{
                tour,
            }
        });

    }catch(error){
        res.status(404).json({
            status: 'failed',
            message: error,
        })
    }
};

// Update a particular tour by id
exports.UpdateTourById=async(req,res)=>{
    try{
        // we will update it
        const tour=await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        res.status(200).json({
            status: 'success',
            data:{
                tour,
            }
        })

    }catch(error){
        res.status(404).json({
            status: 'failed',
            message: error,
        });
    }
};

// delete tour by id
exports.deleteTourById=async(req,res)=>{
    try{
        // now we will delete it and not sent any data to the client, when we delete it
        const tour=await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            results: Tour.length,
            data: null
        });

    }catch(error){
        res.status(404).json({
            status: 'failed',
            message: error,
        });
    }
};

// Aggregation Pipeline is a way to process and analyze the data in a sequence of steps
exports.getTourStats=async(req,res)=>{
    try{
        const stats=await Tour.aggregate([
            // match stage- it filter documents based on certain conditions
            {
                $match: {ratingsAverage: {$gte:4.5}}
            },

            // Group stage-it is basically used to group the documents together
            {
                $group: {

                    // We use null to represents the no grouping by specific fields
                    // _id: null,

                    _id: '$difficulty',
                    numTours: { $sum: 1}, // add 1 for each document
                    numRating: {$sum: '$ratingsQuantity'},
                    avgRating: {$avg: '$ratingsAverage'},
                    avgPrice: {$avg: '$price'},
                    minPrice: {$min: '$price'},
                    maxPrice: {$max: '$price'}
                }
            },
            // sort stage
            {
                // average price is 1 for ascending order
                $sort: {avgPrice:1}
            },

            // again match
            // {
                // Not equals to easy
            //     $match: {_id: {$ne: 'easy'}}
            // }
        ]);

        res.status(200).json({
            status: 'success',
            data:{
                stats,
            }
        })

    }catch(error){
        res.status(404).json({
            status: 'failed',
            message: error,
        })
    }
}

// To calculate the Monthly Plan
exports.getMonthlyPlan= async(req,res)=>{
    try{
        const year=req.params.year*1; // to convert it into the number
        const plan=await Tour.aggregate([

            // unwind is an aggregation pipeline to deconstruct an array field from the input documents and output a document for each element in array
            {
                $unwind: '$startDates'
            },
            {
                $match:{
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: {$month:'$startDates'},
                    numTourStarts: {$sum: 1},
                    tours: {$push:'$name'}
                }
            },
            {
                $addFields: {month:'$_id'}
            },
            {
                $project: {_id: 0}
            },
            {
                // used -1 for descending 
                $sort: {numTourStarts:-1}
            },
            {
                $limit:12
            }
        ]);

        res.status(200).json({
            status: 'success',
            data:{
                plan,
            }
        })

    }catch(error){
        res.status(404).json({
            status: 'failed',
            message: error,
        })
    }
}