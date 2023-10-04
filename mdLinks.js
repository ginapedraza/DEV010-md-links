const { mdLinks } = require('./index');

let receivedPath = 'pruebaFail.md';

mdLinks(receivedPath, true)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });

 