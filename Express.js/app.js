// importing the express library
const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const tourRouter=require('./routes/tourRoutes');
const userRouter=require('./routes/userRoutes');

// to create the instance of express application
const app=express();

// use of cors
app.use(cors());

// morgan helps to log details about the incoming requests to the server and it is also a middleware function
app.use(morgan('dev'));

// it tells express.js to automatically parse the Json data coming in request body
app.use(express.json());

// want to access static file and in this, we can access any file inside it
app.use(express.static(`${__dirname}/public/`))

// creating a middleware function and also order of routes matters
app.use((req,res,next)=>{
    console.log('Hello from the middleware');
    next();  // if not use next, then request will be stuck and response will never sent to client
});

// we can also modify it to not work on all routes instead work on the specific routes by defining inside the route
app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    console.log(req.requestTime);
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

// Routes
app.use('/api/v2/tours',tourRouter);
app.use('/api/v2/users',userRouter);

// exports the application
module.exports=app;