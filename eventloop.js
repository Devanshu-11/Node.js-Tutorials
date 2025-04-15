const fs=require('fs');
const crypto=require('crypto');

// In set timeout function, we make it to execute code after a certain period of time and it is in milliseconds and it is queued in timer phase of event loop
setTimeout(()=>{
    console.log('Timer-1 is finished');
},0);

setImmediate(()=>{
    console.log('Immediate-1 is finished');
});

// Now reading the file asynchronously
fs.readFile(`${__dirname}/Text/start.txt`,()=>{
    console.log('Input Output is finished');

    setTimeout(()=>{
        console.log('Timer-2 is finished');
    },0);

    setTimeout(()=>{
        console.log('Timer-3 is finished');
    },3000);

    // It will be executed in check phase after I/O events and nextTick callbacks
    setImmediate(()=>{
        console.log('Immediate-2 is finished');
    });

    // process.nextTick will execute before any other I/O tasks or timers even before the setTimeout or setImmediate callbacks
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

    // as it is a heavy computational task so it offloads into the thread pool and thread pool in Nodejs by default has 4 threads but it can be increased up to 128 threads or more
    crypto.pbkdf2(password,salt,iterations,keylen,sha256,()=>{
        console.log('password encrypted');
    });
});

console.log("Hello from the top level code");