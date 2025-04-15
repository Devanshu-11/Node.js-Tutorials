// Event Emitters emit events as soon as something important happens in the app like-request hit the server etc. These events are picked up by event listeners that developers set up, and the listeners fire off the callback functions attached to each event.
const EventEmitter=require('events');
const http = require("http");

// Now sales inherits all the property of EventEmitter
class Sales extends EventEmitter{
    constructor(){

        // to access property of Event Emitters,we use super
        super();
    }
}

// creating an instance of Sales
const myEmitter=new Sales();

// this method is used to listen for event and execute a callback function when that event is emitted
myEmitter.on('newSale',()=>{
    console.log('There is a new Sale');
});

myEmitter.on('newSale',()=>{
    console.log('Customer is added');
});

myEmitter.on('newSale',stock=>{
    console.log(`There are now ${stock} items left in stock`);
})

// emitting the event
myEmitter.emit('newSale',20);

// Now in case of http method
const server=http.createServer();

//listening to different event that server will emit
server.on('request',(req,res)=>{
    console.log('Request Received');
    console.log(req.url);
    res.end('Request Received');
});

server.on('request',(req,res)=>{
    console.log('Another Request Received');
});

server.on('close',()=>{
    console.log('Server is closed');
});

// listening for server
server.listen(8000,()=>{
    console.log("Waiting for requests");
});