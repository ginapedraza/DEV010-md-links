const fs = require('fs');
const path =  require('path');
const axios = require('axios');

//Probando leer directorios
const files = fs.readdirSync('./examples');
console.log(files);

//Función para leer el archivo markdown
const readFiles = (receivedPath) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(receivedPath, 'utf-8', (error, datos) => {
            //if (error) {
             // reject('Error al leer el archivo:', error); 
            //} else {
                //onst extractLinks = (datos, receivedPath) => {
                    const linkRegex = /\[(.*?)\]\((https?:\/\/.*?)\)/g;
                    const links = [];
                  
                    let match;
                    while ((match = linkRegex.exec(datos)) !== null) {
                      const link = {
                        text: match[1],
                        href: match[2],
                        file: receivedPath,
                      };
                      links.push(link);
                    }  
                    resolve(links);
                    //console.log(links.length);
                  });
                // console.log('Contenido del archivo Markdown:', datos); // Con este console.log muestra todo el contenido
            });
            
        };

        const validateLinks = (links) => {
          //Creamos un nuevo array para almacenar las peticiones HTTP
          const requestAxios = links.map((link) => {
              // Para cada enlace hacemos una petición Axios para verificar su validez
              //Con Axios hacemos solicitudes HTTP

              return axios.get(link.href)
              .then((response) => {
                //Esto debe devolver en caso de éxito

                return {
                  text: link.text,
                  href: link.href,
                  file: link.file,
                  status: response.status,
                  message: 'Valid',
                };
                   // If the request is successful, update the link object with validation results.
              })
              .catch((error) => {
                return {
                  text: link.text,
                  href: link.href,
                  file: link.file,
                  status: error.status,
                  message: 'Broken',
                };
              });
            });
            

          // Wait for all Axios requests to resolve and return the Promise with the updated link objects.
          return Promise.all(requestAxios);
      };



module.exports = {
    readFiles,
    validateLinks,
   };