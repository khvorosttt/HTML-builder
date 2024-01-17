const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');

const streamWriter = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const r = readline.createInterface(process.stdin);
console.log('Enter text into the console!');
r.on('line', (input) => {
  if (!input.includes('exit')) {
    streamWriter.write(input);
  } else {
    streamWriter.write(input.slice(0, input.indexOf('exit')));
    process.exit();
  }
});
process.on('SIGINT', () => {
  process.exit();
});
process.on('exit', () => {
  console.log('The process has stopped');
});
