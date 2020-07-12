import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import StaticServer from 'react-native-static-server';

import AppLoading from '../../components/AppLoading';
import { getPath, moveAndroidFiles } from '../../services/static';
import { Container } from './styles';

const PORT = 5560;

export default function Read({ route, navigation }) {
  const [baseUrl, setBaseUrl] = useState('');
  const { url: bookPath } = route.params;

  useEffect(() => {
    let server = null;
    async function startServer() {
      await moveAndroidFiles();
      server = new StaticServer(PORT, getPath(), { localOnly: true });
      const serverUrl = await server.start();
      setBaseUrl(serverUrl);
    }

    startServer();
    return () => server && server.stop();
  }, []);

  if (!baseUrl) return <AppLoading />;

  return (
    <Container>
      <WebView source={{ uri: `${baseUrl}/?path=${bookPath}` }} />
    </Container>
  );
}
