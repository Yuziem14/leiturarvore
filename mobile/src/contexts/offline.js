import React, { useState, useEffect, useContext, createContext } from 'react';
import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import * as offlineService from '../services/offline';
import * as bookApi from '../services/books.api';
import { useAuth } from './auth';

const OfflineContext = createContext({});

const IS_DOWNLOADED = '@leiturarvore:isDownloaded';

export function OfflineProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [downloads, setDownloads] = useState(null);
  const [sharing, setSharing] = useState([]);
  const [serverUrl, setServerUrl] = useState('');
  const [connection, setConnection] = useState({});
  const { signed } = useAuth();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(
      ({ isConnected, isInternetReachable }) => {
        setConnection({ isConnected, isInternetReachable });
      }
    );

    return function () {
      unsubscribe();
    };
  }, []);

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
    async function _updateStorage() {
      if (!downloads) {
        await AsyncStorage.setItem(IS_DOWNLOADED, ''); /** '' === false */
        setLoading(true);
      } else {
        await AsyncStorage.setItem(IS_DOWNLOADED, 'true');
        setLoading(false);
      }
    }

    _updateStorage();
  }, [downloads]);

  useEffect(() => {
    async function _init() {
      if (signed && !downloads && connection.isInternetReachable) {
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
    const isSharing = sharing.find(book => book.slug === slug);
    if (isSharing) return;

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
        loading,
        connection,
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
