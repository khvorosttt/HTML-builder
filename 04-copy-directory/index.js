const fs = require('fs');
const path = require('path');

function copyDir() {
  const oldDirPath = path.join(__dirname, 'files');
  const newDirPath = path.join(__dirname, 'files-copy');
  fs.promises.mkdir(newDirPath, { recursive: true });
  return fs.readdir(
    oldDirPath,
    {
      withFileTypes: true,
    },
    (err, files) => {
      if (err) {
        console.log(err.message);
      }
      for (let file of files) {
        fs.promises.copyFile(
          path.join(oldDirPath, file.name),
          path.join(newDirPath, file.name),
        );
      }
    },
  );
}

copyDir();
