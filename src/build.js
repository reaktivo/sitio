import * as helpers from './helpers.js';

function parseFileName(fileNameWithExtension) {
  if (typeof fileNameWithExtension !== 'string') {
    throw new Error('parseFileName expected string');
  }

  const fileName = fileNameWithExtension.split('.').slice(0, -1).join('.');
  return fileName;
}

export default async function build() {
  const cwd = await helpers.getCwd();
  const pagesDir = [cwd, 'pages'].join('/');
  const outDir = [cwd, 'out'].join('/');

  const response = await fetch('https://api.aceandtate.com/api/accessories');
  const json = await response.json();
  console.log(JSON.stringify(json));

  await helpers.mkdir([cwd, 'out'].join('/'));
  const allFileNames = await helpers.readDir(pagesDir);
  const fileNames = allFileNames.filter(fileName => !fileName.startsWith('.'));

  for (let fileName of fileNames) {
    const mod = await import([pagesDir, fileName].join('/'));
    const str = await mod.default();
    const outFileName = parseFileName(fileName) + '.html';
    await helpers.writeFile([outDir, outFileName].join('/'), str);
  }
}
