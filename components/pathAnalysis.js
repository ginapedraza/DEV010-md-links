const fs = require('fs');
const path =  require('path');
const colors = require('colors');


//Transformamos la ruta relativa a absoluta (si ya fuera absoluta, la devuelve igual)
const transformToAbsolutePath = (receivedPath) => {
  // Verificar si la ruta recibida es absoluta
  if (path.isAbsolute(receivedPath)) {
    console.log('la ruta es absoluta');
    return receivedPath; // Si la ruta es absoluta, retornarla sin cambios
  } else {
    // Si la ruta es relativa, convertirla a una ruta absoluta
    //console.log('Transformamos a ruta absoluta');
    const absolutePath = path.resolve(process.cwd(), receivedPath);
    return absolutePath;
  }
};

//Verificamos que la ruta exista en la computadora
const checkIfPathExists = (receivedPath) => {
  const pathExists = fs.existsSync(receivedPath);
  //console.log(pathExists);
  return pathExists;

};

//Leemos directorios
const readDirectory = (receivedPath) => {
  const files = fs.readdirSync(receivedPath); // Leemos los nombres de los archivos de forma síncrona
  let mdFiles = []; // Creamos un array para almacenar los archivos md que encontremos
  files.forEach(file => { //Iteramos sobre los archivos
    const fullPath = path.join(receivedPath, file); // acá unimos las rutas
    //console.log(fullPath);
    const fileStats = fs.statSync(fullPath); //Obtenemos estadísticas del archivo para verificar si es archivo o directorio
    const extension = path.extname(fullPath);
    const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
    const pathIsMarkdown = validExtensions.includes(extension);

    if (fileStats.isFile() && pathIsMarkdown) {
      mdFiles.push(fullPath); //Si es archivo md lo agregamos al array que creamos
    } else if (fileStats.isDirectory()) {
    //Si es directorio, llamamos recursivamente a la función readDirectory para explorar los archivos
      mdFiles = mdFiles.concat(readDirectory(fullPath));
    }
    //console.log(fileStats);
  });
  console.log(colors.blue('\u2B50 Archivos markdown encontrados:', mdFiles));
  
  return mdFiles;
}

//Verificamos que sea un archivo markdown
const checkPathExtension = (receivedPath) => {
  const extension = path.extname(receivedPath);
  const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
  const pathIsMarkdown = validExtensions.includes(extension);
 //console.log(pathIsMarkdown);
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
  

