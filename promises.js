const fs=require('fs');
const superagent=require('superagent');

// read the dog.txt file asynchronously
fs.readFile(`${__dirname}/Text/dog.txt`,(err,data)=>{
    console.log(`Breed is: ${data}`);

    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then(res=>{
        console.log(res.body.message);

        fs.writeFile('./Text/dog-img.txt',res.body.message,err=>{
            console.log("Random Dog image saved to file");
        });
    }).catch(err=>{
        console.log(err.message);
    })
});