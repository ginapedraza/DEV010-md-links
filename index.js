const fs = require('fs/promises');
const path = require('path');
const { transformToAbsolutePath, checkIfPathExists, checkPathExtension } =  require('./components/pathAnalysis');
const { readFiles, validateLinks } = require('./components/linkAnalysis');
const axios = require('axios');
//const validateLinks = require('./components/mdLinks');
// const { error } = require('console');

//Recibimos la ruta ingresada
const receivedPath = process.argv[2];

// Construimos la promesa
const mdLinks = (receivedPath, validate) => { 
  return new Promise((resolve, reject) => {
    const absolutePath = transformToAbsolutePath(receivedPath);
    // Resolver la Promesa con la ruta absoluta.
   //resolve(absolutePath);
   console.log('Ruta absoluta:', absolutePath);

// Verifica si la ruta existe
    const pathExists = checkIfPathExists(absolutePath);
      if(!pathExists) {
        //console.log('La ruta no existe')
        return reject('La ruta no existe');  
      } else {
        console.log('La ruta existe');
      }

// Verifica si es un archivo markdown
    const fileExtension = checkPathExtension(absolutePath);
      if(!fileExtension) {
        //console.log('El archivo no es markdown');
        return reject('El archivo no es markdown');   
       } else {
        console.log('El archivo es markdown');
       }

  //Leemos el contenido del archivo markdown y extraemos links
    readFiles(absolutePath)
      .then((links) => {
        if (links.length === 0) {
          console.log('No se han encontrado links');
          return resolve([]); // Retorna un arreglo vacío si no hay links
        }

        if (validate) {
          validateLinks(links)
            .then((results) => {
              resolve(results);
            })
            /*.catch((error) => {
              console.error('Error:', error);
              reject(error);
            });*/
        } else {
          resolve(links);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};


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