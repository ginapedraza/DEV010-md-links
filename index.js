const fs = require('fs');
const path = require('path');
const { transformToAbsolutePath, checkIfPathExists, readDirectory, checkPathExtension } =  require('./components/pathAnalysis');
const { readFiles, validateLinks } = require('./components/linkAnalysis');
const axios = require('axios');
const colors = require('colors');

// Construimos la promesa
const mdLinks = (receivedPath, validate) => { 
  return new Promise((resolve, reject) => {
    const absolutePath = transformToAbsolutePath(receivedPath);
    // Resolver la Promesa con la ruta absoluta.
   //resolve(absolutePath);
   console.log(colors.blue('\u2B50 Ruta absoluta =>', absolutePath));

// Verifica si la ruta existe
    const pathExists = checkIfPathExists(absolutePath);
      if(!pathExists) {
        //console.log('La ruta no existe')
        return reject(colors.red('La ruta no existe'));  
      } else {
        console.log(colors.blue('\u2B50 ¡La ruta existe en la computadora!'));
      }

      const stats = fs.statSync(absolutePath);
      
  //Verifica si es directorio o archivo
  if(stats.isDirectory()) {
    const files = readDirectory(absolutePath);
  const promises = files.map(file => {
    return readFiles(file)
    .then((links) => {
      if (validate) {
        return validateLinks(links);
      }
      return links; // Devuelve los links sin validar si no es necesario
    });
  });

  // Espera a que todas las promesas se resuelvan y aplanar los resultados
  Promise.all(promises)
    .then(results => {
      const links = results.flat(); // Aplanar el array de arrays de links
      resolve(links);
    })
    .catch(error => {
      reject(error);
    });
    } else {
    // Verifica si es un archivo markdown
    const fileExtension = checkPathExtension(absolutePath);
      if(!fileExtension) {
      return reject(colors.red('El archivo no es markdown'));   
      } else {
      console.log(colors.blue('\u2B50 El archivo es markdown'));
      }

  //Leemos el contenido del archivo markdown y extraemos links
  readFiles(absolutePath)
    .then((links) => {
    if (links.length === 0) {
    console.log(colors.red('No se han encontrado links'));
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
      console.error(colors.red('Ocurrió un problema al leer la ruta especificada'));
      reject(error);
    });
  };
  });
};


module.exports = {
  mdLinks,
 };

