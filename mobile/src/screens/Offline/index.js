import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList } from 'react-native';
import {
  Container,
  Main,
  Search,
  Input,
  Button,
  Book,
  BookSection,
  BookWrapper,
  BookItem,
  SectionTitle,
  ActionButton,
  ButtonText,
} from './styles';
import { MaterialIcons } from '@expo/vector-icons';

import Header from '../../components/Header';
import BookList from '../../components/BookList';
import AppLoading from '../../components/AppLoading';

import api from '../../services/api';

export default function Offline({ navigation }) {
  const [downloaded, setDownloaded] = useState(null);
  const [sharing, setSharing] = useState(null);

  function share(slug) {
    const shared = downloaded.filter(book => book.slug === slug);
    setSharing([...sharing, ...shared]);
    // navigation.navigate('Modal');
  }

  function stop(slug) {
    const shared = sharing.filter(book => !book.slug === slug);
    console.log(shared);
    setSharing(shared);
  }

  useEffect(() => {
    async function _loadBooks() {
      const { data } = await api.get('/books', {
        params: {
          filter: 'availableOffline',
        },
      });

      console.log(data);

      const pdfOnly = data.books.filter(({ book_url }) => {
        const isPdf = !!book_url.match(new RegExp(/.pdf/g));
        console.log(isPdf);
        return isPdf;
      });

      const shared = pdfOnly.filter(book => book.slug === 'minimos-contos');

      setDownloaded(pdfOnly);
      setSharing(shared);
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
        <ScrollView>
          <BookSection>
            <SectionTitle>Seus livros baixados estão aqui...</SectionTitle>
            <FlatList
              data={downloaded}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                const book = item.book ? item.book : item;
                return (
                  <BookItem>
                    <BookWrapper
                      activeOpacity={0.8}
                      onPress={() =>
                        handleSelectBook({
                          slug: book.slug,
                          url: book.book_url || null,
                        })
                      }
                    >
                      <Book
                        source={{ uri: book.imageUrlThumb || book.cover_image }}
                      />
                    </BookWrapper>
                    <ActionButton onPress={() => share(book.slug)}>
                      <ButtonText>Compartilhar</ButtonText>
                    </ActionButton>
                  </BookItem>
                );
              }}
              keyExtractor={(item, index) =>
                `Seus livros baixados estão aqui...${item.slug}:${index}`
              }
            />
          </BookSection>

          <BookSection>
            <SectionTitle>
              Livros sendo compartilhados localmente...
            </SectionTitle>
            <FlatList
              data={sharing}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                const book = item.book ? item.book : item;
                return (
                  <BookItem>
                    <BookWrapper
                      activeOpacity={0.8}
                      onPress={() =>
                        handleSelectBook({
                          slug: book.slug,
                          url: book.book_url || null,
                        })
                      }
                    >
                      <Book
                        source={{ uri: book.imageUrlThumb || book.cover_image }}
                      />
                    </BookWrapper>
                    <ActionButton onPress={() => stop(book.slug)}>
                      <ButtonText>Parar</ButtonText>
                    </ActionButton>
                  </BookItem>
                );
              }}
              keyExtractor={(item, index) =>
                `Livros sendo compartilhados localmente...${item.slug}:${index}`
              }
            />
          </BookSection>
        </ScrollView>
      </Main>
    </Container>
  );
}
