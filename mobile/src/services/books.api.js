import api from './api';

const languages = {
  por: 'Português',
  en: 'Inglês',
};

function _parseAsArray(data) {
  return Array.isArray(data) ? data : Array(data);
}

function _isOne(data) {
  return data.length === 1;
}

function _first(data) {
  return data[0];
}

function _serialize(books) {
  books = _parseAsArray(books);
  const serializedBooks = books.map(book => {
    if (book.book) {
      return book.book;
    }

    let categories = null;
    let themes = null;
    let characteristics = null;

    if (!book.bookUrl) {
      categories = book.bookCategory.map(({ category }) => category.name);
      themes = book.bookTheme.map(({ theme }) => theme.name);
      characteristics = book.bookCharacteristic.map(
        ({ characteristic }) => characteristic.name
      );
    } else {
      categories = book.categories;
      themes = book.themes;
      characteristics = book.characteristics;
    }

    return {
      title: book.name,
      author: book.author,
      sinopse: book.description,
      image: book.imageUrlIntermediaria,
      edition: book.edition || 'Única',
      language: languages[book.language] || book.language,
      publisher: book.publisher.name,
      categories: categories,
      themes: themes,
      characteristics: characteristics,
      isDownloaded: book.isDownloaded,
    };
  });

  return _isOne(serializedBooks) ? _first(serializedBooks) : serializedBooks;
}

export async function findBook(slug) {
  const {
    data: { book },
  } = await api.get(`books/${slug}`);

  return _serialize(book);
}

export async function fetchBooksByCategory(categories, page = 1) {
  categories = _parseAsArray(categories);

  const responses = await Promise.all(
    categories.map(category =>
      api.get('books', {
        params: {
          filter: 'category',
          searchTerm: category,
          page,
        },
      })
    )
  );

  const booksByCategory = responses.map(({ data }) => data);

  return _isOne(booksByCategory) ? _first(booksByCategory) : booksByCategory;
}

export async function fetchViewedBooks() {
  const {
    data: { books },
  } = await api.get('books', {
    params: {
      filter: 'viewed',
    },
  });

  return _serialize(books);
}

export async function fetchOfflineBooks() {
  const {
    data: { books },
  } = await api.get('books', {
    params: { filter: 'availableOffline' },
  });

  return books;
}
export async function searchBooks(searchTerm, page = 1) {
  const {
    data: { books },
  } = await api.get('books', {
    params: { filter: 'search', searchTerm, page },
  });

  return books;
}

export async function fetchDownloads() {
  const {
    data: { downloads },
  } = await api.get('downloads');

  return _serialize(downloads);
}

export async function addToDownloads(slug) {
  const bookId = await api.post(`downloads`, { slug });
  return bookId;
}

export async function removeFromDownloads(slug) {
  await api.delete(`downloads/${slug}`);
}
