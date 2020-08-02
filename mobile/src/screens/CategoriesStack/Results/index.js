import React, { useState, useEffect } from 'react';

import { Container, Main } from '../styles';
import BookList from '../../../components/BookList';
import Header from '../../../components/Header';
import OfflineMessage from '../../../components/OfflineMessage';
import * as bookApi from '../../../services/books.api';
import { useOffline } from '../../../contexts/offline';

export default function Results({ route }) {
  const { connection } = useOffline();
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

    if (connection.isInternetReachable) _loadBooks();
  }, [connection.isInternetReachable]);

  return (
    <Container>
      <Header />
      <Main>
        {!connection.isInternetReachable ? (
          <OfflineMessage />
        ) : (
          <BookList title={books.title} books={books.books} />
        )}
      </Main>
    </Container>
  );
}
