const fs = require('fs');
const path = require('path');

const pathWriteFile = path.join(__dirname, '/project-dist', 'bundle.css');
const pathStyleFile = path.join(__dirname, '/styles');
const streamWriter = fs.createWriteStream(pathWriteFile);
fs.readdir(
  pathStyleFile,
  {
    withFileTypes: true,
  },
  (err, files) => {
    if (err) {
      console.log(err.message);
    }
    for (let file of files) {
      if (file.isFile()) {
        const fileFormat = path.extname(file.name);
        if (fileFormat === '.css') {
          const streamReader = fs.createReadStream(
            path.join(pathStyleFile, file.name),
          );
          streamReader.on('data', function (chunk) {
            streamWriter.write(chunk);
          });
        }
      }
    }
  },
);
