const app=require('./app');
const dotenv=require('dotenv');

// config dotenv
dotenv.config({path: './.env'});

// for port
const port= process.env.PORT||3000;

// to start the server
app.listen(port,()=>{
    console.log(`App running on Port ${port}`);
});