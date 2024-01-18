const fs = require('fs');
const path = require('path');

async function copyDir() {
  const oldDirPath = path.join(__dirname, 'files');
  const newDirPath = path.join(__dirname, 'files-copy');
  await fs.promises.rm(newDirPath, { forse: true, recursive: true });
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
        fs.promises.copyFile(
          path.join(oldDirPath, file.name),
          path.join(newDirPath, file.name),
        );
      }
    },
  );
}

copyDir();
