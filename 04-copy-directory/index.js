const fs = require('fs');
const path = require('path');

const oldDirPath = path.join(__dirname, 'files');
const newDirPath = path.join(__dirname, 'files-copy');
async function copyDir(oldDirPath, newDirPath) {
  console.log(newDirPath);
  await fs.promises.rm(newDirPath, { force: true, recursive: true });
  await fs.promises.mkdir(newDirPath, { recursive: true });
  await fs.readdir(
    oldDirPath,
    {
      withFileTypes: true,
    },
    (err, files) => {
      if (err) {
        console.log(err.message);
      }
      for (let file of files) {
        if (file.isDirectory()) {
          copyDir(
            path.join(oldDirPath, file.name),
            path.join(newDirPath, file.name),
          );
        } else {
          fs.promises.copyFile(
            path.join(oldDirPath, file.name),
            path.join(newDirPath, file.name),
          );
        }
      }
    },
  );
}

copyDir(oldDirPath, newDirPath);
