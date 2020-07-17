import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import {
  Container,
  Main,
  Search,
  Input,
  Button,
  StartSessionButton,
  StartSessionText,
  Action,
  ActionText,
} from './styles';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import Header from '../../components/Header';
import BookList from '../../components/BookList';

import { startServer } from '../../services/static';
import { useOffline } from '../../contexts/offline';

const PORT = 7070;

export default function Offline({ navigation }) {
  const {
    downloads,
    sharing: shared,
    serverUrl,
    updateServerUrl,
    shareBook,
    stopShare,
  } = useOffline();
  const [downloaded, setDownloaded] = useState([]);
  const [sharing, setSharing] = useState(shared);
  const [server, setServer] = useState(null);

  useEffect(() => {
    async function _init() {
      await refreshSession();
      setDownloaded(downloads);
    }

    _init();
  }, []);

  useEffect(() => {
    setDownloaded(downloads);
  }, [downloads]);

  useEffect(() => {
    const sharedBooks = shared.map(sharedItem => {
      const book = downloaded.find(
        download => sharedItem.slug === download.slug
      );
      return {
        ...book,
        ...sharedItem,
      };
    });

    setSharing(sharedBooks);
  }, [shared]);

  async function _startServer() {
    const locations = await startServer(PORT, {
      keepAlive: true,
    });

    return locations;
  }

  async function _stopServer() {
    server.staticServer.stop();
    await Promise.all(
      sharing.map(sharedBook => stopShare(sharedBook.uri, sharedBook.slug))
    );
  }

  async function refreshSession() {
    if (!serverUrl) return;
    const { server: staticServer, url } = await _startServer();
    setServer({ staticServer, url });
  }

  async function toggleSession() {
    if (!server) {
      const { server: staticServer, url } = await _startServer();
      setServer({ staticServer, url });
      if (!serverUrl) updateServerUrl(url);
    } else {
      await _stopServer();
      setServer(null);
      updateServerUrl('');
    }
  }

  async function share({ bookUrl, slug }) {
    const shared = await shareBook(bookUrl, 'www/sharing', slug);
    console.log(shared);
  }

  async function stop({ slug }) {
    const { uri } = shared.find(item => item.slug === slug);
    await stopShare(uri, slug);
  }

  return (
    <Container>
      <Header>
        <Search>
          <Input
            placeholderTextColor="#666"
            placeholder="Pesquise por livros..."
          />
          <Button activeOpacity={0.8}>
            <MaterialIcons name="search" color="#666" size={32} />
          </Button>
        </Search>
      </Header>
      <Main>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StartSessionButton activeOpacity={0.7} onPress={toggleSession}>
            <StartSessionText>
              {server
                ? 'Interromper Sessão'
                : 'Iniciar sessão de compartilhamento'}
            </StartSessionText>
            <MaterialCommunityIcons
              name={server ? 'server-off' : 'server'}
              color="#fff"
              size={24}
            />
          </StartSessionButton>
          <BookList
            title="Seus livros baixados estão aqui..."
            books={downloaded}
            isOffline
          >
            <Action onClick={share}>
              <ActionText>Compartilhar</ActionText>
              <MaterialCommunityIcons
                name="share-variant"
                color="#fff"
                size={16}
              />
            </Action>
          </BookList>
          <BookList
            title="Livros sendo compartilhados localmente..."
            books={sharing}
            isOffline
          >
            <Action onClick={stop}>
              <ActionText>Parar</ActionText>
              <MaterialCommunityIcons name="stop" color="#fff" size={16} />
            </Action>
            <Action>
              <ActionText>Mostrar</ActionText>
              <MaterialCommunityIcons
                name="qrcode-scan"
                color="#fff"
                size={16}
              />
            </Action>
          </BookList>
        </ScrollView>
      </Main>
    </Container>
  );
}
