const { mdLinks } = require('./index');

let receivedPath = './examples';

mdLinks(receivedPath, false)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });

 