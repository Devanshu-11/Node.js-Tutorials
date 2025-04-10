// 1- Node.js is not a programming Language, it is a runtime environment that allows JavaScript to run outside the browser. It is built on the V8 JavaScript engine 
// 2- Browser like chrome etc have in built engines which processes and renders the html, css and js to display web pages
// 3- In simple words a Nodejs is just like a container or like an environment in which our js code can be run outside the browser
// 4- If we use it outside the browser then we can access the data files of the system and can interact with the database like mongodb, mysql without needed of the browser api's
// 5- We will not prefer nodejs if we are doing the heavy server side processing like- image manipulation, video conversions and file compressions and it is because it is single threaded and due to this, cpu intensive tasks will block the event loop causing delays for other requests
// 6- Node.js is a single threaded based on event driven, non blocking I/O Model
// 7- If nodejs would be a multi threaded language, it could execute tasks faster especially for cpu intensive tasks but there is disadvantages like the context switching, deadlocks etc which will reduce the efficiency
// 8- Context switching means when cpu switches from one process to another, it saves the current process state and loading the new process state, but when there is large application model,  cpu will spend most of its time doing the context switching and reducing overall efficiency instead of doing the actual tasks
// 9- Event Driven means Nodejs listens for the specific events like- user requests, read files, database queries etc and trigger the corresponding callback function asynchronously when the event occurs, instead of executing whole code sequentially 
// 10- Non-Blocking I/O Model means handling requests asynchronously without waiting for an operation to complete before moving to the next task.
// 11- NPM (Node Package Manager) is the default package manager for the Node.js. It helps developers to manage libraries and dependencies for their Node.js projects. With NPM, you can install, share, and manage packages (also known as modules or libraries) that your project depends on.
// Node Repl-
// Node repl- It stands for Read,Eval,Print,Loop and it is basically a command line environment which is used for run the js code outside the browser
// to initialize the repl, we write node in terminal
// read- It reads the js expression you enter
// eval-It evaluates expression
// print-It prints the result of the evaluation.
// loop-The process repeats, so you can continue typing and testing new code

// synchronous and asynchronous operatrions-
// In synchronous operations-Here tasks are completed one after another, and here it stops and wait for task to complete before moving to next task
// In asynchronous operations-it does not wait for the task to complete, instead move to next task and callback,promises, async-await will handle result once task is completed

// Callback hell-
// Callback hell is a condition where multiple nested callbacks are used in asynchronous functions, making the code hard to read, maintain, and debug.

// Http requests
// Get- It is used to retrieve the data from the server
// Post- It is used to send the data to server and create a new resource, here sending the same requests multiple time, it is basically creating the multiple resources
// Put- It is update or replace an existing resource on server, if the resource is not exist, it will create a new resource and it will update partial resource but condition is that all parameters should be required otherwise it will replace it
// Delete- It deletes a resource from server
// Patch- It can partially or fully  update the resource from the server, and if the resource is not present, then patch will not create it

// Application Programming Interface
// It means Api which is Application Programming Interface is a set of rules that allows different software applications to communicate to each other

// Middlewares-
// Middleware is a function that is running during the request response cycle, they basically have access to request and response objects, and they can basically interact with them before passing the control to next step, eg- login, logout etc

// MongoDb-
// MongoDb is a NoSql database means it is non relational database which helps for storing the large amount of data and it stores the data in Bson format which is binary javascript object notation and Bson has more advantages over Json  which add additional data types such as ObjectId, Date etc
// Mongodb stored the data in documents and documents are stored in collections
// In Mongodb here the data is particularly stored in the key value pairs

// Promises-
// A promise function represents an operation which is not completed yet but it will either succeed or fail.
// It has three stages:
// 1- Pending: It’s still working.
// 2- Resolved: It finished successfully.
// 3- Rejected: Something went wrong.
// You can use .then() to handle success, .catch() for errors, and .finally() for code that runs after the task is done,
