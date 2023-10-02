const { mdLinks } = require('./index');

let receivedPath = 'prueba.md';

mdLinks(receivedPath, true)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });

 