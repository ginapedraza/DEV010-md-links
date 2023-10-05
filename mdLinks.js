const { mdLinks } = require('./index');

let receivedPath = './examples';

mdLinks(receivedPath, true)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });

 