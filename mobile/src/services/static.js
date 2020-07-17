import axios from 'axios';
import RNFS from 'react-native-fs';
import StaticServer from 'react-native-static-server';

const files = [
  'www/index.html',
  'www/jszip.min.js',
  'www/epub.min.js',
  'www/render.min.js',
  'www/main.min.css',
  'www/arrow.svg',
  'www/leiturarvore-logo.png',
];

export async function startServer(PORT, options) {
  await moveAndroidFiles();
  const server = new StaticServer(PORT, getPath(), options);
  const url = await server.start();
  return { server, url };
}

export function isRunning(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        resolve(true);
      })
      .catch(err => {
        resolve(false);
      });
  });
}

export function getPath() {
  return `${RNFS.DocumentDirectoryPath}/www`;
}

export async function moveAndroidFiles() {
  const exists = await RNFS.exists(getPath());

  if (!exists) {
    await RNFS.mkdir(getPath());
  }

  await Promise.all(
    files.map(file => {
      RNFS.copyFileAssets(file, `${RNFS.DocumentDirectoryPath}/${file}`);
    })
  );
}
