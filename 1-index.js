// The fs module is used for interacting with the file system, enabling tasks like reading, writing, and manipulating files and directories.
const fs=require('fs');

// read the file for the synchronously
// we use utf-8 to decode the raw byte data into a readable string and if we are not using it, it will gives us buffer
const textIn=fs.readFileSync('./Text/input.txt','utf-8');
console.log(textIn);

// to write the file synchronously
// if i executed again and again, output.txt would be updated instead of creating new one
const textOut='Hi, I want to write the file in the output.txt';
fs.writeFileSync('./Text/output.txt',textOut);
console.log("Write File sync is executed properly");

// to read the file asynchronously- here it do not want for completion, instead move to next line
fs.readFile('./Text/start.txt','utf-8',(err,data)=>{
    console.log(data);
});
console.log("We will read file asynchronously");

// reading the file asynchronously
fs.readFile('./Text/start.txt','utf-8',(err,data1)=>{
    if(err){
        console.log("Error has been found");
    }
    
    fs.readFile('./Text/readText.txt','utf-8',(err,data2)=>{
        console.log(data2);
    });
});

// writing the file asynchronously
const textWrite='In this, Now we will write the file asynchronously in end.txt';
fs.writeFile('./Text/end.txt',textWrite,'utf-8',err=>{
    console.log("File has been written properly");
});