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
import AppLoading from '../../components/AppLoading';

import api from '../../services/api';

export default function Offline({ navigation }) {
  const [downloaded, setDownloaded] = useState(null);
  const [sharing, setSharing] = useState(null);

  useEffect(() => {
    async function _loadBooks() {
      const { data } = await api.get('/books', {
        params: {
          filter: 'availableOffline',
        },
      });

      setDownloaded([data.books[0]]);
      setSharing([data.books[1]]);
    }

    _loadBooks();
  }, []);

  if (!downloaded || !sharing) return <AppLoading />;

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
          <StartSessionButton activeOpacity={0.7}>
            <StartSessionText>
              Iniciar sessão de compartilhamento
            </StartSessionText>
            <MaterialCommunityIcons name="server" color="#fff" size={24} />
          </StartSessionButton>
          <BookList
            title="Seus livros baixados estão aqui..."
            books={downloaded}
          >
            <Action>
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
          >
            <Action>
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
