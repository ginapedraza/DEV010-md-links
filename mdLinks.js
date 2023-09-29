const { mdLinks } = require('./index');

let receivedPath = './prueba.md';

mdLinks(receivedPath, false)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });

 