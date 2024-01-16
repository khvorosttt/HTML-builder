const fs = require('fs');
const path = require('path');

try {
  const stream = fs.createReadStream(path.join(__dirname, 'text.txt'));
  stream.on('data', function (chunk) {
    console.log(chunk.toString());
  });
} catch (error) {
  console.log(error);
}
