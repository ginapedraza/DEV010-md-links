import fs from 'fs/promises';
import path from 'path';

//module.exports = () => {
  // ...
//};

const mdLinks = (path) => {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(path);
    // Resolver la Promesa con la ruta absoluta.
    resolve(absolutePath);
  
});
};
