#!/usr/bin/env node
const { mdLinks } = require('./index');
const colors = require('colors');
const fs = require('fs');


const args = process.argv.slice(2); //Obtiene los argumentos proporcionados al comando
const receivedPath = args[0];
const validateOption = args.includes('--validate');
const statsOption = args.includes('--stats');

if (!receivedPath) {
    console.error('Debe proporcionar la ruta de un archivo o directorio.');
    process.exit(1); // Salir del programa con código de error
  }

if (validateOption && statsOption) {
    mdLinks(receivedPath, true)
    .then((links) => {
        const uniqueLinks = new Set(links.map(link => link.href)); // Esto se encarga de crear un nuevo conjunto o set de links a partir de los valores href de cada link.
        const validLinks = links.filter(link => link.message === 'Ok');
        const brokenLinks = links.filter(link => link.message === 'Fail');
        console.log('🔗 Cantidad de links:', links.length);
        console.log('🔗 Enlaces únicos:', uniqueLinks.size);
        console.log('🔗 Enlaces válidos:', validLinks.length);
        console.log('🔗 Enlaces rotos:', brokenLinks.length);
        
      })
    .catch((error) => {
      console.error(error);
    });

} else if (validateOption) {
    mdLinks(receivedPath, true)
  .then((links) => {
    links.forEach(link => {
        const truncatedText = link.text.length > 50 ? link.text.slice(0, 50) + '...' : link.text;
        console.log(colors.magenta(receivedPath), colors.green(link.href), colors.cyan(link.message), colors.cyan(link.status), colors.yellow(truncatedText));
    })
   
  })
  .catch((error) => {
    console.error(error);
  });
} else if (statsOption) {
  mdLinks(receivedPath, false)
  .then((links) => {
      const uniqueLinks = new Set(links.map(link => link.href)); // Esto se encarga de crear un nuevo conjunto o set de links a partir de los valores href de cada link.  
      console.log('🔗Cantidad de links:', links.length);
      console.log('🔗Enlaces únicos:', uniqueLinks.size);
    })
  .catch((error) => {
    console.error(error);
  });

} else {
    mdLinks(receivedPath)
    .then((links) => {
      links.forEach(link => {

          const truncatedText = link.text.length > 50 ? link.text.slice(0, 50) + '...' : link.text;
          console.log(colors.magenta(receivedPath), colors.green(link.href), colors.yellow(truncatedText));
          
      });
  })
  .catch((error) => {
      console.error(error);
    }); 
}

  
