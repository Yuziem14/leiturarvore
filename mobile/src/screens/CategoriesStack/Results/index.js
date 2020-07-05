import React, { useState, useEffect } from 'react';
import { Container, Main } from '../styles';
import api from '../../../services/api';

import BookList from '../../../components/BookList';
import Header from '../../../components/Header';

import logo from '../../../assets/logo.png';

export default function Results({ route }) {
  const { category } = route.params;
  const [books, setBooks] = useState({});

  useEffect(() => {
    async function _loadBooks() {
      const {
        data: { books },
      } = await api.get('books', {
        params: {
          filter: 'category',
          searchTerm: category.name,
        },
      });

      setBooks({
        title: `Livros sobre ${category.name}...`,
        books,
      });
    }

    _loadBooks();
  }, []);

  return (
    <Container>
      <Header />
      <Main>
        <BookList title={books.title} books={books.books} />
      </Main>
    </Container>
  );
}
