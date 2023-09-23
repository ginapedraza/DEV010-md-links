import fs from 'fs/promises';
import path from 'path';
import mdLinks from './mdLinks.mjs'

//module.exports = () => {
  // ...
//};

//Transformamos la ruta relativa a absoluta (si ya fuera absoluta, la devuelve igual)
const transformToAbsolutePath = (receivedPath) => {
  // Verificar si la ruta recibida es absoluta
  if (path.isAbsolute(receivedPath)) {
    return receivedPath; // Si la ruta es absoluta, retornarla sin cambios
  } else {
    // Si la ruta es relativa, convertirla a una ruta absoluta
    return path.resolve(process.cwd(), receivedPath);
  }
};

//probando la promesa
mdLinks(receivedPath)
.then((absolutePath) => {
  console.log('Ruta absoluta:', absolutePath);
})
.catch((error) => {
  console.error('Error:', error);
});


export { transformToAbsolutePath };