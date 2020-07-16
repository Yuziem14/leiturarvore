import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import StaticServer from 'react-native-static-server';

import { EpubContainer } from './styles';

import AppLoading from '../../components/AppLoading';
import { getPath, moveAndroidFiles } from '../../services/static';
import { useOffline } from '../../contexts/offline';

const PORT = 5560;

export default function EpubReader({ sourceUri, isDownloaded }) {
  const [baseUrl, setBaseUrl] = useState('');
  const [localFile, setLocalFile] = useState(null);
  const { serveBook, stopServeBook } = useOffline();

  async function _transferFile() {
    const isHttp = new RegExp(/http/).test(sourceUri);
    if (isHttp || !isDownloaded) return null;

    const location = await serveBook(sourceUri, 'www');
    return location;
  }

  function _getRoute() {
    if (!localFile) {
      return `${baseUrl}/?path=${sourceUri}`;
    }

    return `${baseUrl}/?path=/${localFile.filename}`;
  }

  useEffect(() => {
    let server = null;
    let location = null;

    async function startServer() {
      await moveAndroidFiles();
      server = new StaticServer(PORT, getPath(), { localOnly: true });
      const serverUrl = await server.start();
      location = await _transferFile();
      setLocalFile(location);
      setBaseUrl(serverUrl);
    }

    startServer();
    return () => {
      location && stopServeBook(location.uri);
      server && server.stop();
      console.log('Stopping server');
    };
  }, []);

  if (!baseUrl) return <AppLoading />;

  return (
    <WebView
      style={EpubContainer}
      source={{
        uri: _getRoute(),
      }}
    />
  );
}
