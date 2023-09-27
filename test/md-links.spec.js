const { mdLinks } = require('../index');
// const { transformToAbsolutePath, checkIfPathExists, checkPathExtension } =  require('../components/pathAnalysis');
// const { readFiles } = require('./components/mdLinks');

describe('mdLinks', () => {
  it('deberia ser una funcion', ()=> {
    expect(typeof mdLinks).toBe('function'); 
  }); 
  
  it('debería resolver con un array de enlaces', () => {
    //const receivedPath = './prueba.md';
    return mdLinks('docs/04-milestone.md')
      .then((result) => {
        expect(Array.isArray(result)).toBe(true);
      });
  }); 
  it('should return an array with 5 links for an .md file with 5 links', () => {
    return mdLinks('docs/04-milestone.md')
    .then((links) => {
      expect(links.length).toBe(5);
      ; // Llama a done() para indicar que la prueba ha finalizado
    })
    .catch((error) => {
      ; // Llama a done(error) si ocurre un error durante la prueba
    });
});
it('Should return an array of Objects', () => {
  mdLinks('docs/04-milestone.md').then((links) => {
      expect(links).toEqual( [
        {
          text: 'mdlinks-example',
          href: 'https://github.com/Laboratoria/bootcamp/assets/123121338/7dcc83c4-873e-4ef8-b7d0-a15adb102680',
          file: 'C:\\Users\\Juan Viloria\\Desktop\\LABORATORIA\\BOOTCAMP\\4to proyecto\\DEV010-md-links\\docs\\04-milestone.md'
        },
        {
          text: 'mdlinks-example-validate',
          href: 'https://github.com/Laboratoria/bootcamp/assets/123121338/502cbafc-b4ac-4734-85b3-1734f67af1d3',
          file: 'C:\\Users\\Juan Viloria\\Desktop\\LABORATORIA\\BOOTCAMP\\4to proyecto\\DEV010-md-links\\docs\\04-milestone.md'
        },
        {
          text: 'mdlinks-example-stats',
          href: 'https://github.com/Laboratoria/bootcamp/assets/123121338/910720c6-aa3f-4d08-b076-c1add13c95f1',
          file: 'C:\\Users\\Juan Viloria\\Desktop\\LABORATORIA\\BOOTCAMP\\4to proyecto\\DEV010-md-links\\docs\\04-milestone.md'
        },
        {
          text: 'mdlinks-example-stats-validate',
          href: 'https://github.com/Laboratoria/bootcamp/assets/123121338/9d9971a0-866a-4c64-a890-4c62c3df3700',
          file: 'C:\\Users\\Juan Viloria\\Desktop\\LABORATORIA\\BOOTCAMP\\4to proyecto\\DEV010-md-links\\docs\\04-milestone.md'
        },
        {
          text: 'NPM',
          href: 'https://www.npmjs.com/',
          file: 'C:\\Users\\Juan Viloria\\Desktop\\LABORATORIA\\BOOTCAMP\\4to proyecto\\DEV010-md-links\\docs\\04-milestone.md'
        }
      ])
  }); 
  });
});
