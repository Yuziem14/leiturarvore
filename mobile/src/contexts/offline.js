import React, { useState, useEffect, useContext, createContext } from 'react';
import { AsyncStorage } from 'react-native';

import * as offlineService from '../services/offline';
import * as bookApi from '../services/books.api';
import { useAuth } from './auth';

const OfflineContext = createContext({});

const IS_DOWNLOADED = '@leiturarvore:isDownloaded';
const SHARING = '@leiturarvore:sharing';
const SERVER_URL = '@leiturarvore:sharingServer';

export function OfflineProvider({ children }) {
  const [downloads, setDownloads] = useState(null);
  const [sharing, setSharing] = useState([]);
  const [serverUrl, setServerUrl] = useState('');
  const { signed } = useAuth();

  useEffect(() => {
    async function _loadStorage() {
      const isDownloaded = await AsyncStorage.getItem(IS_DOWNLOADED);
      if (isDownloaded) {
        const storedDownloads = await bookApi.fetchDownloads({
          from: bookApi.STORED_DOWNLOADS,
        });

        await setDownloads(storedDownloads);
      }
    }

    try {
      _loadStorage();
    } catch (err) {
      console.log('Fetching downloads context: ', err);
    }
  }, []);

  useEffect(() => {
    async function _loadStorageData() {
      const [storedShared, server] = await AsyncStorage.multiGet([
        SHARING,
        SERVER_URL,
      ]);
      const shared = JSON.parse(storedShared[1]);
      const url = server[1] || '';
      setSharing(shared);
      setServerUrl(url);
    }

    _loadStorageData();
  }, []);

  useEffect(() => {
    async function _updateStorage() {
      if (!downloads) {
        await AsyncStorage.setItem(IS_DOWNLOADED, ''); /** '' === false */
      } else {
        await AsyncStorage.setItem(IS_DOWNLOADED, 'true');
      }
    }

    _updateStorage();
  }, [downloads]);

  useEffect(() => {
    async function _updateSharing() {
      const newSharing =
        typeof sharing === 'string' ? JSON.parse(sharing) : sharing;
      await AsyncStorage.setItem(SHARING, JSON.stringify(newSharing));
    }

    _updateSharing();
  }, [sharing]);

  useEffect(() => {
    async function _updateServerUrl() {
      await AsyncStorage.setItem(SERVER_URL, serverUrl);
      const store = await AsyncStorage.getItem(SERVER_URL);
    }

    _updateServerUrl();
  }, [serverUrl]);

  useEffect(() => {
    async function _init() {
      if (signed && !downloads) {
        const downloadedBooks = await bookApi.fetchDownloads({
          from: bookApi.API_DOWNLOADS,
        });
        const stored = await offlineService.registerDownloads(downloadedBooks);
        setDownloads(stored);
      } else if (!signed && downloads) {
        await offlineService.clearDownloads();
        setDownloads(null);
        setSharing([]);
        setServerUrl('');
      }
    }

    try {
      _init();
    } catch (err) {
      console.log('Error initializing offline context: ', err);
    }
  }, [signed]);

  async function downloadBook(slug) {
    const { data: book } = await bookApi.addToDownloads(slug);
    if (!book) return null;
    const updatedDownloads = await offlineService.addDownload(book);
    setDownloads(updatedDownloads);
  }

  async function removeDownload(slug) {
    await bookApi.removeFromDownloads(slug);
    const updatedDownloads = await offlineService.removeDownload(slug);
    setDownloads(updatedDownloads);
  }

  async function serveBook(origin, dest) {
    const location = await offlineService.copyFiles(origin, dest);
    return location;
  }

  async function stopServeBook(origin) {
    await offlineService.removeFiles(origin);
  }

  async function shareBook(origin, dest, slug) {
    const { filename, uri } = await serveBook(origin, dest);
    setSharing([
      ...sharing,
      { filename, uri, slug, staticPath: `sharing/${filename}` },
    ]);
    return { filename, uri };
  }

  async function stopShare(origin, slug) {
    await stopServeBook(origin);
    const shared = sharing;
    const index = shared.findIndex(sharedBook => sharedBook.slug === slug);
    if (index === -1) return;
    shared.splice(index, 1);
    setSharing([...shared]);
  }

  function updateServerUrl(url) {
    setServerUrl(url);
  }

  return (
    <OfflineContext.Provider
      value={{
        downloads,
        isDownloaded: !!downloads,
        sharing,
        serverUrl,
        downloadBook,
        removeDownload,
        serveBook,
        stopServeBook,
        shareBook,
        stopShare,
        updateServerUrl,
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  const context = useContext(OfflineContext);
  return context;
}

export default OfflineContext;
