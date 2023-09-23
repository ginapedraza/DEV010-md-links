import fs from 'fs/promises';
import path from 'path';

const receivedPath = process.argv[2];

//Creamos la promesa
const mdLinks = (receivedPath) => {
    return new Promise((resolve, reject) => {
      const absolutePath = transformToAbsolutePath(receivedPath);
      // Resolver la Promesa con la ruta absoluta.
      resolve(absolutePath);
    
  });
  };

