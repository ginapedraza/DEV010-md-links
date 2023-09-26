const fs = require('fs');
const path =  require('path');


//const files = fs.readdirSync('./');
//console.log(files);

//Función para leer el archivo markdown
const readFiles = (receivedPath) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(receivedPath, 'utf-8', (error, datos) => {
            if (error) {
              return reject('Error al leer el archivo:', error); 
            } else {
                //onst extractLinks = (datos, receivedPath) => {
                    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                    const links = [];
                  
                    let match;
                    while ((match = linkRegex.exec(datos)) !== null) {
                      const link = {
                        text: match[1],
                        href: match[2],
                        file: receivedPath
                      };
                      links.push(link);
                    }  
                    resolve(links);
                    console.log(links.length);
                  };
                // console.log('Contenido del archivo Markdown:', datos); // Con este console.log muestra todo el contenido
            });
            
        });
    };

//Función para extraer los links del archivo



module.exports = {
    readFiles,
   };