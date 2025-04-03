// Routing is the process of determining how to respond to incoming Http requests based on url and http methods and it is the method of how application should respond to different http requests
// Api(Application Programming Interface) is a service in which we can particularly requested the data
const http=require('http');
const url=require('url');
const fs=require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const newData=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObject=JSON.parse(newData);

// create server- Every time incoming req hits the server, callback function will be called
const server=http.createServer((req,res)=>{
    console.log(req.url);

    const pathName=req.url;
    if(pathName==='/'||pathName==='/overview'){
        res.end("This is the overview");
    }else if(pathName==='/product'){
        res.end("this is product");
    }else if(pathName==='/api'){
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(newData);

    }else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header':'Hello World'
        });

        res.end('<h1>This page could not be found</h1>');
    }
});

// Now listen for incoming req to the server
server.listen(port,hostname,()=>{
    console.log(`Server is running on port ${port}`);
});