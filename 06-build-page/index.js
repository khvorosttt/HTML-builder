const fs = require('fs');
const path = require('path');

const pathNewFolder = path.join(__dirname, '/project-dist');
const pathComponents = path.join(__dirname, '/components');
const oldDirAssetsPath = path.join(__dirname, 'assets');
const newDirAssetsPath = path.join(pathNewFolder, 'assets');
fs.promises.mkdir(pathNewFolder, { recursive: true });

async function createIndexHTML() {
  const streamWriter = fs.createWriteStream(
    path.join(pathNewFolder, 'index.html'),
  );
  let templateData = await fs.promises.readFile(
    path.join(__dirname, 'template.html'),
    {
      encoding: 'utf-8',
    },
  );
  await fs.readdir(
    pathComponents,
    {
      withFileTypes: true,
    },
    async (err, files) => {
      for (let file of files) {
        const fileFormat = path.extname(file.name);
        const fileName = path.basename(file.name, fileFormat);
        const index = templateData.indexOf(fileName);
        const fileComponent = await fs.promises.readFile(
          path.join(pathComponents, file.name),
          {
            encoding: 'utf-8',
          },
        );
        templateData = templateData.replace(
          templateData.slice(index - 2, index + fileName.length + 2),
          fileComponent,
        );
      }
      streamWriter.write(templateData);
    },
  );
}

async function mergeStyles() {
  const pathStyleFiles = path.join(__dirname, '/styles');
  const streamWriter = fs.createWriteStream(
    path.join(pathNewFolder, 'style.css'),
  );
  await fs.readdir(
    path.join(__dirname, '/styles'),
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
              path.join(pathStyleFiles, file.name),
            );
            streamReader.on('data', function (chunk) {
              streamWriter.write(chunk);
            });
          }
        }
      }
    },
  );
}

async function copyDir(oldDirAssetsPath, newDirAssetsPath) {
  await fs.promises.rm(newDirAssetsPath, { force: true, recursive: true });
  await fs.promises.mkdir(newDirAssetsPath, { recursive: true });
  await fs.readdir(
    oldDirAssetsPath,
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
            path.join(oldDirAssetsPath, file.name),
            path.join(newDirAssetsPath, file.name),
          );
        } else {
          fs.promises.copyFile(
            path.join(oldDirAssetsPath, file.name),
            path.join(newDirAssetsPath, file.name),
          );
        }
      }
    },
  );
}

createIndexHTML();
mergeStyles();
copyDir(oldDirAssetsPath, newDirAssetsPath);
