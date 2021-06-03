// two command line args
//1. URL = http://www.example.edu/
//2. Local file path = ./index.html
//process
//make an http request and wait for response
//take the data from the request and write it to a file.
// Step 1 - setup the connection to the server

const net = require("net");
const fs = require("fs");
const request = require('request');

const conn = net.createConnection({
  host: 'example.edu',
  port: 80
});
conn.setEncoding('UTF8');
conn.on('connect', () => {
  console.log(`Connected to server!`);

  conn.write(`GET / HTTP/1.1\r\n`);
  conn.write(`Host: example.edu\r\n`);
  conn.write(`\r\n`);
});

// Step 2 - download the file from the server

request('http://example.edu', (error, response, data) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('data:', data); // Print the HTML for the homepage.
  writeFile("./index.html",data);
});

// Step 3 - write the file to the disk

const writeFile = (fileToMake, fileContents) => {
  fs.writeFile(fileToMake, fileContents, (err) => {
    if (err) throw err;
    console.log(`Downloaded and saved ${getFileSize(fileToMake)} bytes to ${fileToMake}`);
  });
};

// Getting file size

const getFileSize = file => {
  let size = fs.statSync(file).size;
  return size;
};

