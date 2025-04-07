// Routing is the process of determining how to respond to incoming Http requests based on url and http methods and it is the method of how application should respond to different http requests
// Api(Application Programming Interface) is a service in which we can particularly requested the data from a server
const http=require('http');
const url=require('url');
const fs=require('fs');
const slugify=require('slugify');
const replaceTemplate=require('./modules/replaceTemplate');

const hostname = '127.0.0.1';
const port = 3000;

// we save it here because we do not need to read the data each time when req is there, instead we can read only one time and use it again
// __dirname specifies actual path of directory that contains the currently executing script file
const newData=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');

// After reading the data, we have parse it
const dataObject=JSON.parse(newData);

const slugs=dataObject.map(el=> slugify(el.productName, {lower:true}));
console.log(slugs);

// read all the files Synchronously
const tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

// create server- Every time incoming req hits the server, callback function will be called
const server=http.createServer((req,res)=>{
    console.log(req.url);
    console.log(url.parse(req.url,true));

    const {query,pathname}=url.parse(req.url,true);
    // const pathName=req.url;

    // overview page
    if(pathname==='/'||pathname==='/overview'){

        // it tells the client about the status and what type of data is being sent and in this case, it will contain the Html content
        res.writeHead(200,{
            'Content-type':'text/html',
        });

        // it iterates all over the products in the data object and replace template function is called
        const cardsHtml=dataObject.map((el)=>replaceTemplate(tempCard,el)).join('');
        const output=tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
        res.end(output);

        // product page
    }else if(pathname==='/product'){
        const product=dataObject[query.id];
        res.writeHead(200,{
            'Content-type':'text/html',
        });

        let output=replaceTemplate(tempProduct,product);

        console.log(query);
        res.end(output);

        // api page
    }else if(pathname==='/api'){
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(newData);

        // not found page
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