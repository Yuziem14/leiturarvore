const BOOK_FRAGMENT = `fragment bookNavigationFields on Book {
  name
  author
  slug
  description
  imageUrlIntermediaria
  imageUrlThumb
}`

module.exports = {
  CATEGORIES: `query {
    me {
      reader {
        categories {
          name
          slug
        }
      }
    }
  }`,
  BOOK: `${BOOK_FRAGMENT}

  query Book($slug: String!) {
    bookDetails(slug: $slug) {
      ...bookNavigationFields
      bookCharacteristic {
        characteristic {
          name
        }
      }
      bookTheme {
        theme {
          name
        }
      }
      bookCategory {
        category {
          name
        }
      }
      language
      publisher {
        name
      }
      edition
    }
  }
  `,
  BOOKS: `${BOOK_FRAGMENT}

  query BooksInCategoryWithFilters($searchTerm: String!, $page: Int, $opts: String) {
    search: searchCategoryV2(searchTerm: $searchTerm, page: $page, opts: $opts) {
      books {
          ...bookNavigationFields
      }
    }
  }
  `,
  VIEWED_BOOKS: `${BOOK_FRAGMENT}

  query User {
    me {
      reader {
        viewedBooks(last: 10) {
          book {
            ...bookNavigationFields
          }
          percentage
        }
      }
    }
  }`,
  SEARCH: `${BOOK_FRAGMENT}

  query SearchBookWithFiltersQuery($searchTerm: String!, $page: Int, $opts: String) {
    search: searchBookV2(searchTerm: $searchTerm, page: $page, opts: $opts) {
      books {
        ...bookNavigationFields
      }
    }
  }`,
}
