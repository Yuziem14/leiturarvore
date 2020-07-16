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

import { useOffline } from '../../contexts/offline';

export default function Offline({ navigation }) {
  const { downloads } = useOffline();
  const [downloaded, setDownloaded] = useState(downloads);
  const [sharing, setSharing] = useState([]);

  useEffect(() => {
    setDownloaded(downloads);
  }, [downloads]);

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
            isOffline
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
            isOffline
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
