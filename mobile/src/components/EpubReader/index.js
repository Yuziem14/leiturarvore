import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import StaticServer from 'react-native-static-server';

import { EpubContainer } from './styles';
import { getPath, moveAndroidFiles } from '../../services/static';
import AppLoading from '../../components/AppLoading';

const PORT = 5560;

export default function EpubReader({ sourceUri }) {
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    let server = null;
    async function startServer() {
      await moveAndroidFiles();
      server = new StaticServer(PORT, getPath(), { localOnly: true });
      const serverUrl = await server.start();
      setBaseUrl(serverUrl);
    }

    startServer();
    return () => {
      server && server.stop();
      console.log('Stopping server');
    };
  }, []);

  if (!baseUrl) return <AppLoading />;

  return (
    <WebView
      style={EpubContainer}
      source={{ uri: `${baseUrl}/?path=${sourceUri}` }}
    />
  );
}
