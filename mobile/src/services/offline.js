import { FileSystem } from 'react-native-unimodules';
import rnPath from 'react-native-path';
import hash from 'shorthash';
import { parseAsArray, first, isOne } from '../utils';

export const REGISTRY_URI = `${FileSystem.documentDirectory}registry.json`;
export const BOOKS_URI = `${FileSystem.documentDirectory}books`;
export const WWW_URI = `${FileSystem.documentDirectory}www`;
export const SHARING_URI = `${FileSystem.documentDirectory}www/sharing`;

function _serialize(downloads) {
  downloads = parseAsArray(downloads);

  const serialized = downloads.map(download => {
    if (download.isSerialized) return download;

    return {
      ...download,
      imageUrlThumb: _getFileUri(download.imageUrlThumb),
      imageUrlIntermediaria: _getFileUri(download.imageUrlIntermediaria),
      bookUrl: _getFileUri(download.bookUrl),
      isDownloaded: true,
      isSerialized: true,
    };
  });

  return isOne(serialized) ? first(serialized) : serialized;
}

async function _createIfNotExists(uri) {
  const { exists } = await FileSystem.getInfoAsync(uri);
  if (!exists) {
    await FileSystem.makeDirectoryAsync(uri, { intermediates: true });
  }
  return true;
}

export function _getFileName(url) {
  const extension = rnPath.extname(url);
  return `${hash.unique(url)}${extension}`;
}

export function _getFileUri(url) {
  return `${BOOKS_URI}/${_getFileName(url)}`;
}

async function _downloadFiles(urls) {
  urls = parseAsArray(urls);

  const downloads = await Promise.all(
    urls.map(url => FileSystem.downloadAsync(url, _getFileUri(url)))
  );
  const uris = downloads.map(({ uri }) => {
    console.log(`\u001b[33mFile: ${uri} created...`);
    return uri;
  });

  return isOne(uris) ? first(uris) : uris;
}

async function _updateRegistry(downloads) {
  downloads = parseAsArray(_serialize(downloads));
  await FileSystem.writeAsStringAsync(REGISTRY_URI, JSON.stringify(downloads));
  console.log('\u001b[32mRegistry.json created!');
  return [...downloads];
}

export async function removeFiles(uris) {
  uris = parseAsArray(uris);

  await Promise.all(
    uris.map(uri => FileSystem.deleteAsync(uri, { idempotent: true }))
  );
}

export async function copyFiles(origin, dest) {
  const from = origin;
  const to = `${FileSystem.documentDirectory}${dest}`;
  const filename = rnPath.basename(from);
  await _createIfNotExists(to);
  await FileSystem.copyAsync({
    from,
    to: `${to}/${filename}`,
  });
  return { filename, uri: `${to}/${filename}` };
}

export async function loadDownloads() {
  const { exists } = await FileSystem.getInfoAsync(REGISTRY_URI);
  if (!exists) return [];
  const downloadsJson = await FileSystem.readAsStringAsync(REGISTRY_URI);
  const downloads = _serialize(JSON.parse(downloadsJson));
  return parseAsArray(downloads);
}

export async function registerDownloads(downloads = null) {
  const { exists } = await FileSystem.getInfoAsync(REGISTRY_URI);
  if (exists) {
    const stored = await loadDownloads();
    return stored;
  }

  await _createIfNotExists(BOOKS_URI);
  if (!downloads) downloads = [];

  await Promise.all(
    downloads.map(download =>
      _downloadFiles([
        download.imageUrlThumb,
        download.imageUrlIntermediaria,
        download.bookUrl,
      ])
    )
  );

  const registered = await _updateRegistry(downloads);
  return registered;
}

export async function findDownload(slug) {
  const downloads = await loadDownloads();
  const book = downloads.find(download => download.slug === slug);
  if (!book) return null;
  return { ..._serialize(book) };
}

export async function addDownload(newDownload) {
  let downloads = await loadDownloads();
  if (!newDownload) return downloads;

  await _downloadFiles([
    newDownload.imageUrlThumb,
    newDownload.imageUrlIntermediaria,
    newDownload.bookUrl,
  ]);

  downloads = await _updateRegistry([...downloads, newDownload]);
  return downloads;
}

export async function removeDownload(slug) {
  const downloads = await loadDownloads();

  const index = downloads.findIndex(download => download.slug === slug);
  if (index === -1) return [...downloads];

  const [removed] = downloads.splice(index, 1);
  if (!removed) return downloads;

  await removeFiles([
    removed.imageUrlThumb,
    removed.imageUrlIntermediaria,
    removed.bookUrl,
  ]);
  const updated = await _updateRegistry([...downloads]);
  return updated;
}

export async function clearDownloads() {
  await removeFiles([REGISTRY_URI, BOOKS_URI, SHARING_URI]);
  return true;
}
