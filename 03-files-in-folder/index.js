const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, '/secret-folder');
fs.readdir(
  pathFolder,
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
        const fileName = path.basename(file.name, fileFormat);
        let fileSize = 0;
        fs.stat(path.join(pathFolder, file.name), (error, stats) => {
          if (error) {
            console.log(error.message);
          }
          fileSize = stats.size;
          console.log(
            `${fileName}-${fileFormat.slice(1)}-${fileSize / 1000}kb`,
          );
        });
      }
    }
  },
);
