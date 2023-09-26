const fs = require('fs/promises');
const path = require('path');
const { transformToAbsolutePath, checkIfPathExists, checkPathExtension } =  require('./components/pathAnalysis');
const { readFiles } = require('./components/mdLinks');

//Recibimos la ruta ingresada
const receivedPath = process.argv[2];

// Construimos la promesa
const mdLinks = (receivedPath) => {
  return new Promise((resolve, reject) => {
    const absolutePath = transformToAbsolutePath(receivedPath);
    // Resolver la Promesa con la ruta absoluta.
   resolve(absolutePath);
   console.log('Ruta absoluta:', absolutePath);

// Verifica si la ruta existe
    const pathExists = checkIfPathExists(absolutePath);
      if(!pathExists) {
        console.log('La ruta no existe')
        return Promise.reject(new Error('La ruta no existe'));  
      } else {
        console.log('La ruta existe');
      }

// Verifica si es un archivo markdown
    const fileExtension = checkPathExtension(absolutePath);
      if(!fileExtension) {
        console.log('El archivo no es markdown');
        return Promise.reject(new Error('El archivo no es markdown'));   
       } else {
        console.log('El archivo es markdown');
       }

  //Leemos el contenido del archivo markdown y extraemos links
    const readMarkdownFile = readFiles(absolutePath)
      .then((links) => {
      console.log('Enlaces encontrados:', links);
      })
      .catch((error) => {
      console.error('Error:', error);
      });
  });
};


//probando la promesa (esto se debe probar en otro lugar, mdLinks se debe exportar)
mdLinks(receivedPath)
.then((links) => {
  //console.log('Ruta absoluta:', absolutePath);
})
.catch((error) => {
  console.error('Error:', error);
});


module.exports = {
  mdLinks,
 };

 



    /*let mdFiles = [];
    const stats = fs.statSync(absolutePath);

    if (stats.isDirectory()) {
      // Si la ruta es un directorio, leer los archivos .md dentro de él
      mdFiles = readDir(absolutePath);
      console.log('es un directorio:', mdFiles);
    } else if (stats.isFile() && path.extname(absolutePath) === ".md") {
      // Si la ruta es un archivo .md, agregarlo al array de archivos .md
      mdFiles = [absolutePath];
      console.log('es un archivo:',mdFiles);
    } else {
      // Si la ruta no es un directorio ni un archivo .md válido, rechazar la promesa con un mensaje de error
      reject("La ruta especificada no es un directorio ni un archivo .md válido.");
      return;
    }*/


    //Comprobando si el archivo existe, si es file o directory
/*fs.stat(absolutePath, (err, stats) => {
  if( !err ){
       if(stats.isFile()){
           console.log('is file ? ' + stats.isFile());
       }
 
       else if(stats.isDirectory()){
           console.log('is directory? ' + stats.isDirectory());
       }
   }
   else
       throw err; 
});*/