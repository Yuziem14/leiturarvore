import React, { useState, useEffect } from 'react';

import { Container, Main } from '../styles';
import BookList from '../../../components/BookList';
import Header from '../../../components/Header';
import * as bookApi from '../../../services/books.api';

export default function Results({ route }) {
  const { category } = route.params;
  const [books, setBooks] = useState({});

  useEffect(() => {
    async function _loadBooks() {
      const { books: booksByCategory } = await bookApi.fetchBooksByCategory(
        category.name
      );

      setBooks({
        title: `Livros sobre ${category.name}...`,
        books: booksByCategory,
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
