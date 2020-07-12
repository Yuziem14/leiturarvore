import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Container, Search, Input, Button, BooksContainer } from './styles';
import { MaterialIcons } from '@expo/vector-icons';

import Header from '../../components/Header';
import BookList from '../../components/BookList';

import api from '../../services/api';
import { useAuth } from '../../contexts/auth';

export default function Home() {
  const { user } = useAuth();
  const [books, setBooks] = useState(null);

  useEffect(() => {
    async function _loadBooks() {
      const [viewed, offline, ...byCategories] = await Promise.all([
        api.get('books', {
          params: {
            filter: 'viewed',
          },
        }),
        api.get('books', {
          params: {
            filter: 'availableOffline',
          },
        }),
        ...user.categories.map(category => {
          return api.get('books', {
            params: {
              filter: 'category',
              searchTerm: category.name,
            },
          });
        }),
      ]);

      const serializedBooks = [
        {
          title: 'Continuar lendo...',
          books: [...offline.data.books, ...viewed.data.books],
        },
        ...byCategories.map(({ data }) => ({
          title: `Livros sobre ${data.category}...`,
          books: data.books,
        })),
      ];

      setBooks(serializedBooks);
    }

    _loadBooks();
  }, []);

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
