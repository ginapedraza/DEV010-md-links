#!/usr/bin/env node
const { mdLinks } = require('./index');
const colors = require('colors');


const args = process.argv.slice(2); //Obtiene los argumentos proporcionados al comando
const receivedPath = args[0];
const validateOption = args.includes('--validate');
const statsOption = args.includes('--stats');

if (!receivedPath) {
    console.error('Debe proporcionar la ruta de un archivo o directorio.');
    process.exit(1); // Salir del programa con código de error
  }

if (validateOption) {
    mdLinks(receivedPath, true)
  .then((links) => {
    links.forEach(link => {
        const truncatedText = link.text.length > 50 ? link.text.slice(0, 50) + '...' : link.text;
        console.log(colors.green(receivedPath), colors.blue(link.href), colors.red(link.message), colors.white(link.status), colors.yellow(truncatedText));
    })
   
  })
  .catch((error) => {
    console.error(error);
  });
} else {
    mdLinks(receivedPath)
    .then((links) => {
      links.forEach(link => {
          //const file = fs.readdirSync(receivedPath);
          //const fullPath = receivedPath.join(receivedPath, file);
          const truncatedText = link.text.length > 50 ? link.text.slice(0, 50) + '...' : link.text;
          console.log(colors.green(receivedPath), colors.blue(link.href), colors.yellow(truncatedText));
          
      });
  })
  .catch((error) => {
      console.error(error);
    }); 
}

  // Probamos la función mdLinks con la ruta proporcionada
  
