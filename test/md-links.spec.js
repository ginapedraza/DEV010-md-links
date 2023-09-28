const { validateLinks } = require('../components/mdLinks');
//const { transformToAbsolutePath } = require('../components/pathAnalysis');
const { mdLinks } = require('../index');
const axios = require('axios');
// const { transformToAbsolutePath, checkIfPathExists, checkPathExtension } =  require('../components/pathAnalysis');
// const { readFiles } = require('./components/mdLinks');

describe('mdLinks', () => {
  it('debería resolver con un array de enlaces cuando la ruta pasada es absoluta', () => {
    //const receivedPath = './prueba.md';
    return mdLinks('C:\\Users\\Juan Viloria\\Desktop\\LABORATORIA\\BOOTCAMP\\4to proyecto\\DEV010-md-links\\docs\\04-milestone.md', validate = false)
      .then((result) => {
        expect(Array.isArray(result)).toBe(true);
      });
  }); 
  it('debería resolver con un array de enlaces cuando la ruta es relativa', () => {
    return mdLinks('docs/04-milestone.md', validate = false)
      .then((result) => {
        expect(Array.isArray(result)).toBe(true);
      });
  }); 
  it('should return an array with 5 links for an .md file with 5 links', () => {
    return mdLinks('docs/04-milestone.md', validate = false)
    .then((links) => {
      expect(links.length).toBe(5);
      ; // Llama a done() para indicar que la prueba ha finalizado
    })
    .catch((error) => {
      ; // Llama a done(error) si ocurre un error durante la prueba
    });
});
it('Should return an array of Objects', () => {
  mdLinks('docs/04-milestone.md', validate = false).then((links) => {
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
  it('debería enviar mensaje de error cuando el archivo no es markdown', () => {
    //const receivedPath = './prueba.md';
    return mdLinks('thumb.png', validate = false)
      .catch((error) => {
        expect(error).toBe('El archivo no es markdown');
      });
      
});

/*it('Should return an array of Objects', () => {
  mdLinks('prueba.md', validate = true).then((links) => {
      expect(links).toEqual( [
        {
          text: 'Markdown',
          href: 'https://es.wikipedia.org/wiki/Markdown',
          file: 'C:\\Users\\Juan Viloria\\Desktop\\LABORATORIA\\BOOTCAMP\\4to proyecto\\DEV010-md-links\\prueba.md',
          status: 200,
          message: 'Valid'
        },
        {
          text: 'Node.js',
          href: 'https://nodejs.org/',
          file: 'C:\\Users\\Juan Viloria\\Desktop\\LABORATORIA\\BOOTCAMP\\4to proyecto\\DEV010-md-links\\prueba.md',
          status: 200,
          message: 'Valid'
        },
        {
          text: 'md-links',
          href: 'https://github.com/Laboratoria/bootcamp/assets/12631491/fc6bc380-7824-4fab-ab8f-7ab53cd9d0e4',
          file: 'C:\\Users\\Juan Viloria\\Desktop\\LABORATORIA\\BOOTCAMP\\4to proyecto\\DEV010-md-links\\prueba.md',
          status: 200,
          message: 'Valid'
        }
      ])
  }); 

  });*/
});

jest.mock('axios');
describe('validateLinks', () => {
  it('should validate three links', () => {
    axios.get.mockResolvedValue({ status: 200 });
    axios.get.mockResolvedValue({ status: 200 });
    axios.get.mockResolvedValue({ status: 200 });

    const linksPrueba = [
      {
        text: 'Markdown',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        file: 'C:\\Users\\Juan Viloria\\Desktop\\LABORATORIA\\BOOTCAMP\\4to proyecto\\DEV010-md-links\\prueba.md',

      },
      {
        text: 'Node.js',
        href: 'https://nodejs.org/',
        file: 'C:\\Users\\Juan Viloria\\Desktop\\LABORATORIA\\BOOTCAMP\\4to proyecto\\DEV010-md-links\\prueba.md',
    
      },
      {
        text: 'md-links',
        href: 'https://github.com/Laboratoria/bootcamp/assets/12631491/fc6bc380-7824-4fab-ab8f-7ab53cd9d0e4',
        file: 'C:\\Users\\Juan Viloria\\Desktop\\LABORATORIA\\BOOTCAMP\\4to proyecto\\DEV010-md-links\\prueba.md',
    
      }
    ]

    const linksValidated = [
      {
        text: 'Markdown',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        file: 'C:\\Users\\Juan Viloria\\Desktop\\LABORATORIA\\BOOTCAMP\\4to proyecto\\DEV010-md-links\\prueba.md',
        status: 200,
        message: 'Valid'
      },
      {
        text: 'Node.js',
        href: 'https://nodejs.org/',
        file: 'C:\\Users\\Juan Viloria\\Desktop\\LABORATORIA\\BOOTCAMP\\4to proyecto\\DEV010-md-links\\prueba.md',
        status: 200,
        message: 'Valid'
      },
      {
        text: 'md-links',
        href: 'https://github.com/Laboratoria/bootcamp/assets/12631491/fc6bc380-7824-4fab-ab8f-7ab53cd9d0e4',
        file: 'C:\\Users\\Juan Viloria\\Desktop\\LABORATORIA\\BOOTCAMP\\4to proyecto\\DEV010-md-links\\prueba.md',
        status: 200,
        message: 'Valid'
      }
    ]


    return validateLinks(linksPrueba).then(result => {
      expect(result).toEqual(linksValidated);
    })
  })
})
/*it.only('should return an array with 0 links for an .md file with no links', () => {
  return mdLinks('docs/01-milestone.md')
  //.then((links) => {
    expect(console.log).toBe('No se han encontrado links'); // Verifica que no haya enlaces (el arreglo está vacío)
  });
});*/
