import RNFS from 'react-native-fs';

const files = [
  'www/index.html',
  'www/jszip.min.js',
  'www/epub.min.js',
  'www/render.min.js',
  'www/main.min.css',
  'www/arrow.svg',
  'www/leiturarvore-logo.png',
];

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
