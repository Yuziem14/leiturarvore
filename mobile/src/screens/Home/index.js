import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native';
import {
  Container,
  Header,
  Logo,
  Search,
  Input,
  Button,
  BooksContainer,
  BookSection,
  SectionTitle,
  BookWrapper,
  Book,
} from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

import logo from '../../assets/logo.png';

export default function Home() {
  const { user } = useAuth();
  const [books, setBooks] = useState(null);

  useEffect(() => {
    async function _loadBooks() {
      const [viewed, ...byCategories] = await Promise.all([
        api.get('books', {
          params: {
            filter: 'viewed',
          },
        }),
        ...user.categories.map(category => {
          return api.get('/books', {
            params: {
              filter: 'category',
              searchTerm: category.name,
            },
          });
        }),
      ]);

      const serializedBooks = [
        { title: 'Continuar lendo...', books: viewed.data.books },
        ...byCategories.map(({ data }) => ({
          title: `Livros sobre ${data.category}...`,
          books: data.books,
        })),
      ];

      setBooks(serializedBooks);
    }

    if (!books) _loadBooks();
  }, []);

  function renderItem({ item }) {
    return (
      <BookWrapper activeOpacity={0.7}>
        <Book
          resizeMode="cover"
          source={{
            uri: item.imageUrlThumb || item.book.imageUrlThumb,
          }}
        />
      </BookWrapper>
    );
  }

  function keyExtractor(item, index) {
    return `${item.slug}:${index}`;
  }

  return (
    <Container>
      <Header>
        <Logo source={logo} resizeMode="contain" />
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
      <BooksContainer>
        <ScrollView>
          {books &&
            books.map(data => (
              <BookSection>
                <SectionTitle>{data.title}</SectionTitle>
                <FlatList
                  data={data.books}
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </BookSection>
            ))}
        </ScrollView>
      </BooksContainer>
    </Container>
  );
}
