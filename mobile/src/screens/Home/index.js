import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import {
  Container,
  Header,
  Logo,
  Search,
  Input,
  Button,
  BooksContainer,
} from './styles';
import { MaterialIcons } from '@expo/vector-icons';

import BookList from '../../components/BookList';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

import logo from '../../assets/logo.png';

export default function Home({ navigation }) {
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
            books.map((bookSection, index) => (
              <BookList
                key={index}
                title={bookSection.title}
                books={bookSection.books}
              />
            ))}
        </ScrollView>
      </BooksContainer>
    </Container>
  );
}
