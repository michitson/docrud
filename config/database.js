//require mongoose module
var mongoose = require('mongoose');
var os = require("os");


//require chalk module to give colors to console text
var chalk = require('chalk');

//require database URL from properties file
var dbURL = require('./properties').DB;

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

//export this function and imported by server.js
module.exports =function(){

    mongoose.connect(dbURL);

    mongoose.connection.on('connected', function(){
        console.log(connected("DOCRUD: Mongoose default connection is OPEN to ", dbURL));
    });

    mongoose.connection.on('error', function(err){
        console.log(error("DOCRUD: Mongoose default connection an ERROR has occured " + err + " error"));
        console.log(error("DOCRUD: stack dump is  " + err.stack));
        console.log(error("DOCRUD hostname is " + os.hostname()))
        console.log(error("DOCRUD END stack dump"))
    });

    mongoose.connection.on('disconnected', function(){
        console.log(disconnected("DOCRUD: Mongoose default connection is DISCONNECTED"));
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(termination("Mongoose default connection is DISCONNECTED due to application termination"));
            process.exit(0)
        });
    });
}