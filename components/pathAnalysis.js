const fs = require('fs');
const path =  require('path');


//Transformamos la ruta relativa a absoluta (si ya fuera absoluta, la devuelve igual)
const transformToAbsolutePath = (receivedPath) => {
  // Verificar si la ruta recibida es absoluta
  if (path.isAbsolute(receivedPath)) {
    console.log('la ruta es absoluta');
    return receivedPath; // Si la ruta es absoluta, retornarla sin cambios
  } else {
    // Si la ruta es relativa, convertirla a una ruta absoluta
    console.log('Transformamos a ruta absoluta');
    const absolutePath = path.resolve(process.cwd(), receivedPath);
    return absolutePath;
  }
};

//Verificamos que la ruta exista en la computadora
const checkIfPathExists = (receivedPath) => {
  const pathExists = fs.existsSync(receivedPath);
  console.log(pathExists);
  return pathExists;

};

//Leemos directorios
const readDirectory = (receivedPath) => {
  const files = fs.readdirSync(receivedPath);
  let mdFiles = [];
  files.forEach(file => {
    const fullPath = path.join(receivedPath, file);
    const fileStats = fs.statSync(fullPath);

    if (fileStats.isFile() && file.endsWith('.md')) {
      mdFiles.push(fullPath);
    } else if (fileStats.isDirectory()) {
    
      mdFiles = mdFiles.concat(readDir(fullPath));
    }
  });
  console.log(mdFiles);
  return mdFiles;

  //return files;
}

//Verificamos que sea un archivo markdown
const checkPathExtension = (receivedPath) => {
  const extension = path.extname(receivedPath);
  const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
  const pathIsMarkdown = validExtensions.includes(extension);
  console.log(pathIsMarkdown);
  return pathIsMarkdown;
   // console.log('El archivo es markdown');
  //} else {
   // console.log('El archivo no es markdown');

  };


module.exports = {
    transformToAbsolutePath,
    checkIfPathExists,
    checkPathExtension,
    readDirectory,
   };
  

