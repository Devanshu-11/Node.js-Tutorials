const fs=require('fs');

// get method
const tours=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`,'utf-8')); // we want that it should be read only one time and Json.parse is converting the Json formatting string into the javascript object and Json.stringify converts javascript object into Json formatting string

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
exports.getAllTours=(req,res)=>{
    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours,
        }
    });
};

// get particular tour by id
exports.getTourById=(req,res)=>{
    const id = req.params.id * 1;

    // Searching for the tour with matching id
    const tour=tours.find(el=>el.id===id);

    res.status(200).json({
        status: 'success',
        data: {
            tour,
        }
    });
};

// Posting the particular tour
exports.postTour=(req,res)=>{

    // creating the id by accessing the previous id and then increment it
    const newId=tours[tours.length-1].id+1;

    // Then creating the object by combining id with the data from client request
    const newTour= Object.assign ({id: newId}, req.body);

    // push this tour into tours array
    tours.push(newTour);

    // Writing to file synchronously
    fs.writeFileSync(`${__dirname}/../dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
            status: 'success',
            data: {
                newTour,
            }
        });
    });

    res.status(200).json({
        status: 'success',
        message: 'Executed Successfully'
    });
};

// Update a particular tour by id
exports.UpdateTourById=(req,res)=>{
    res.status(200).json({
        status: 'Success',
        data: {
            tour:'<Updated Tour>'
        }
    });
};

// delete tour by id
exports.deleteTourById=(req,res)=>{
    res.status(204).json({
        status: 'Success',
        data: null,
    });
};
