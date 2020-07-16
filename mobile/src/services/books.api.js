import { parseAsArray, first, isOne } from '../utils';
import api from './api';
import * as offlineService from './offline';

export const API_DOWNLOADS = 'api';
export const STORED_DOWNLOADS = 'storage';

const languages = {
  por: 'Português',
  en: 'Inglês',
};

function _serialize(books) {
  books = parseAsArray(books);
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
      url: book.bookUrl || null,
      categories: categories,
      themes: themes,
      characteristics: characteristics,
      isDownloaded: Boolean(book.isDownloaded),
      isSerialized: true,
    };
  });

  return isOne(serializedBooks) ? first(serializedBooks) : serializedBooks;
}

export async function findBook(slug) {
  let book = await offlineService.findDownload(slug);

  if (!book) {
    const { data } = await api.get(`books/${slug}`);
    book = data.book;
  }

  return _serialize(book);
}

export async function fetchBooksByCategory(categories, page = 1) {
  categories = parseAsArray(categories);

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

  return isOne(booksByCategory) ? first(booksByCategory) : booksByCategory;
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

export async function fetchDownloads({ from = API_DOWNLOADS }) {
  let downloads = null;
  if (from === API_DOWNLOADS) {
    const { data } = await api.get('downloads');
    downloads = data.downloads;
  } else if (from === STORED_DOWNLOADS) {
    downloads = await offlineService.loadDownloads();
  }

  return downloads ? downloads : [];
}

export async function addToDownloads(slug) {
  const bookId = await api.post(`downloads`, { slug });
  return bookId;
}

export async function removeFromDownloads(slug) {
  await api.delete(`downloads/${slug}`);
}
