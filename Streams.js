// In Streams, we basically read and write the data piece by piece instead of completing the read and write operation in one go and not keeping all the data into the memory and streams are instance of event Emitter class
// There are 4 types of streams-
// 1- Readable streams- which reads the data from a source, eg-http requests as Node server receives incoming http requests
// 2- Writabe streams- which is used to write data to a destination, eg-http response as server sends data out to client
// 3- Duplex streams-Both readable and writable, eg-web sockets
// 4- Transform Streams- A special type of duplex stream where the output is computed based on input, eg-compression of data

const fs=require('fs');
const server=require('http').createServer();

server.on('request',(req,res)=>{
    // we will just read the file and in this case, it loads the entire file into the memory
    fs.readFile(`${__dirname}/Text/test.txt`,(err,data)=>{
        if(err){
            console.log(err);
        }

        console.log('Read File is also working fine');
        res.end(data);
    });

    // Now we will use the streams as it is a more better option as we can process it piece by piece rather than loading the whole file and once is it read, it send back to client
    const readable=fs.createReadStream(`${__dirname}/Text/test.txt`);
    readable.on('data',chunk=>{
        res.write(chunk); // used to send data from server to client
        console.log('Stream read successfully');
    });

    // in case, it is end
    readable.on('end',()=>{
        console.log('Now stream is end');
        res.end();
    })

    readable.on('error',err=>{
        console.log(err);
        res.statusCode = 500;
        res.end('File not found');
    });

    // but in above code, there is a problem of back pressure which is server is sending data faster and client has not capacity to handle it, efficiency becomes so low and we can use pipe() method to solve it and it simplify and optimize the process of sending data from the server to the client
    readable.pipe(res);
});

// listen to server
server.listen(8000,()=>{
    console.log('Server is running on port 8000');
});