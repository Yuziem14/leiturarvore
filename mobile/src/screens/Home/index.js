import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Container, Search, Input, Button, BooksContainer } from './styles';
import { MaterialIcons } from '@expo/vector-icons';

import Header from '../../components/Header';
import BookList from '../../components/BookList';

import * as bookApi from '../../services/books.api';
import { useAuth } from '../../contexts/auth';

export default function Home() {
  const { user } = useAuth();
  const [books, setBooks] = useState(null);

  useEffect(() => {
    async function _loadBooks() {
      const [viewed, offline, ...byCategories] = await Promise.all([
        bookApi.fetchViewedBooks(),
        bookApi.fetchOfflineBooks(),
        bookApi.fetchBooksByCategory(
          user.categories.map(category => category.name)
        ),
      ]);

      const sectionBooks = [
        {
          title: 'Continuar lendo...',
          books: [...offline, ...viewed],
        },
        ...byCategories.flat().map(({ books, category }) => ({
          title: `Livros sobre ${category}...`,
          books: books,
        })),
      ];

      setBooks(sectionBooks);
    }
    try {
      _loadBooks();
    } catch (err) {
      console.log(err);
    }
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
