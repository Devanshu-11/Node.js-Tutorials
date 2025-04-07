// importing the express library
const express=require('express');
const fs=require('fs');

// to create the instance of express application
const app=express();

// it tells express.js to automatically parse the Json data coming in request body
app.use(express.json());

// creating a middleware function and also order of routes matters
app.use((req,res,next)=>{
    console.log('Hello from the middleware');
    next();  // if not use next, then request will be stuck and response will never sent to client
})

// we can also modify it to not work on all routes instead work on the specific routes by defining inside the route
app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    next();
});

// Routing- Routing refers to how an application responds to specific client requests, typically based on the HTTP method (GET, POST, etc) and the URL path
app.get('/',(req,res)=>{
    // res.status(200).send('This is the express.js server');

    // we can also send json
    res.status(200).json({message: 'Hi, This is the express.js server in the json Object format', app: 'my-data'});
});

// for the post method
app.post('/',(req,res)=>{
    res.send('You can post this to the url or to the input');
});

// get method
const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`,'utf-8')); // we want that it should be read only one time and Json.parse is converting the Json formatting string into the javascript object and Json.stringify converts javascript object into Json formatting string

// to get all the tours
const getAllTours=(req,res)=>{
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
const getTourById=(req,res)=>{

    // converting the string to a number
    const id=req.params.id*1;
    if(id>tours.length-1){
        return res.status(404).json({
            status: 'Failed',
            message: 'Invalid Id'
        });
    }

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
const postTour=(req,res)=>{

    // creating the id by accessing the previous id and then increment it
    const newId=tours[tours.length-1].id+1;

    // Then creating the object by combining id with the data from client request
    const newTour= Object.assign ({id: newId}, req.body);

    // push this tour into tours array
    tours.push(newTour);

    // Writing to file synchronously
    fs.writeFileSync(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
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
const UpdateTourById=(req,res)=>{
    const id=req.params.id*1;
    if(id>tours.length-1){
        return res.status(404).json({
            status: 'Failed',
            message: 'Invalid Id'
        });
    }

    res.status(200).json({
        status: 'Success',
        data: {
            tour:'<Updated Tour>'
        }
    });
};

// delete tour by id
const deleteTourById=(req,res)=>{
    const id=req.params.id*1;
    if(id>tours.length-1){
        return res.status(404).json({
            status: 'Failed',
            message: 'Invalid Id'
        });
    }

    res.status(204).json({
        status: 'Success',
        data: null,
    });
};

// get method to fetch all the tours
app.get('/api/v2/tours',getAllTours);

// post method to create a particular tour
app.post('/api/v2/tours',postTour);

// get method to access the data of a particular id and also we can also make the parameter optional by writing question Mark in it
app.get('/api/v2/tours/:id',getTourById);

// update the particular data with the id and in that case, we will use patch
app.patch('/api/v2/tours/:id',UpdateTourById);

// Now we will create the delete method
app.delete('/api/v2/tours/:id',deleteTourById);


// to start the server
const port=3000;
app.listen(port,()=>{
    console.log("App running on Port 3000");
});