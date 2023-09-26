const mdLinks = require('../index');
const readFiles = require('../components/mdLinks');


describe('readFiles', () => {

  it('should return an array with 3 links for an .md file with 3 links', () => {
    const absolutePath = 'C:\Users\Juan Viloria\Desktop\LABORATORIA\BOOTCAMP\4to proyecto\DEV010-md-links\prueba.md';
    const readMarkdownFile = readFiles(absolutePath)
      expect(readMarkdownFile.length).toBe(3);
    });
    console.log('FIX ME!');
});
