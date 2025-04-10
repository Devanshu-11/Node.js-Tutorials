const fs=require('fs');
const superagent=require('superagent');

// read the dog.txt file asynchronously
fs.readFile(`${__dirname}/Text/dog.txt`,(err,data)=>{
    console.log(`Breed is: ${data}`);

    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err,res)=>{
        if(err){
            console.log(err.message);
            return;
        }
        console.log(res.body.message);

        fs.writeFile('./Text/dog-img.txt',res.body.message,err=>{
            console.log("Random Dog image saved to file");
        })
    });
});

// As in this code, we are doing the nested callbacks functions which leads to callback hell and it is making the code hard to read, maintain, and debug and here we use promises