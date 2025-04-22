const dotenv=require('dotenv');
const mongoose=require('mongoose');
const fs=require('fs');
const Tour=require('../../models/tourModel');

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


// Read the Json file and convert it to a js object and we use json.parse
const tours=JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));

// Now import the Data into the Database
const importData=async()=>{
    try{

        // to create it
        await Tour.create(tours);
        console.log('Data successfully loaded');
        process.exit();
    }catch(error){
        console.log(error);
    }
}

// Now delete all the data from the collection
const deleteData=async()=>{
    try{
        await Tour.deleteMany();
        console.log('Data successfully deleted');
        process.exit();
    }catch(error){
        console.log(error);
    }
}

if(process.argv[2]=== '--import'){
    importData();
}else if(process.argv[2]=== '--delete') {
    deleteData();
}