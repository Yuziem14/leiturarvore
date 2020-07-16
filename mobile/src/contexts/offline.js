import React, { useState, useEffect, useContext, createContext } from 'react';
import { AsyncStorage } from 'react-native';

import * as offlineService from '../services/offline';
import * as bookApi from '../services/books.api';
import { useAuth } from './auth';

const OfflineContext = createContext({});

const IS_DOWNLOADED = '@leiturarvore:isDownloaded';

export function OfflineProvider({ children }) {
  const [downloads, setDownloads] = useState(null);
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

  return (
    <OfflineContext.Provider
      value={{
        downloads,
        isDownloaded: !!downloads,
        downloadBook,
        removeDownload,
        serveBook,
        stopServeBook,
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
