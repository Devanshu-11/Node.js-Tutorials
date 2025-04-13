const fs=require('fs');
const crypto=require('crypto');

// In set timeout function, we make it to execute code after a certain period of time and it is in milliseconds
setTimeout(()=>{
    console.log('Timer-1 is finished');
},0);

setImmediate(()=>{
    console.log('Immediate-1 is finished');
});

fs.readFile(`${__dirname}/Text/start.txt`,()=>{
    console.log('Input Output is finished');

    setTimeout(()=>{
        console.log('Timer-2 is finished');
    },0);

    setTimeout(()=>{
        console.log('Timer-3 is finished');
    },3000);

    setImmediate(()=>{
        console.log('Immediate-2 is finished');
    });

    process.nextTick(()=>{
        console.log('next tick process is finished');
    });

    // password you want to hash
    let password='password';

    // salt- random variable added to password to save it from attacks
    let salt='salt';

    // iterations- no of time hashing is done, more iterations, more hashing
    let iterations=10;

    // keylen- length of derived key in bytes 
    let keylen=1024;

    // sha256- hashing algorithm is used 
    let sha256= 'sha256';

    // we have used it in order to offload it into the thread pool
    crypto.pbkdf2(password,salt,iterations,keylen,sha256,()=>{
        console.log('password encrypted');
    });
});

console.log("Hello from the top level code");