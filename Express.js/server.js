const app=require('./app');
const dotenv=require('dotenv');
const mongoose=require('mongoose');

// config dotenv
dotenv.config({path: './.env'});

// for port
const port= process.env.PORT||3000;

// for database
const MONGO_URL=process.env.MONGO_URL;

// Connect mongoose to the database
mongoose.connect(MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(conn=>{
    console.log("Database connected successfully");

    // to catch the error
}).catch(err=>{
    console.log("Not able to connect to Database",err);
});

// Creating a new document out of a tour model
// const testTour=new Tour({
//     name: 'The Forest Tiger',
//     rating: 4.7,
//     price: 497
// });

// to save document to database
// testTour.save().then(doc=>{
//     console.log("The document is: ",doc);
// }).catch(err=>{
//     console.log('The error is: ',err);
// })

// to start the server
app.listen(port,()=>{
    console.log(`App running on Port ${port}`);
});