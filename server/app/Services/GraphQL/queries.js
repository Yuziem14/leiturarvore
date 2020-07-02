const BOOK_FRAGMENT = `fragment bookNavigationFields on Book {
  name
  author
  slug
  degree
  description
  imageUrlIntermediaria
  imageUrlThumb
  __typename
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
  BOOKS: `${BOOK_FRAGMENT}

  query BooksInCategoryWithFilters($searchTerm: String!, $page: Int, $opts: String) {
    search: searchCategoryV2(searchTerm: $searchTerm, page: $page, opts: $opts) {
      books {
          ...bookNavigationFields
        __typename
      }
      __typename
    }
  }
  `,
  BOOK: `${BOOK_FRAGMENT}

  query Book($slug: String!) {
    bookDetails(slug: $slug) {
      ...bookNavigationFields
      bookCharacteristic {
        characteristic {
          name
          __typename
        }
        __typename
      }
      bookTheme {
        theme {
          name
          __typename
        }
          __typename
       }
      bookCategory {
        category {
          name
          __typename
        }
      }
      bookDegree {
        degree
        __typename
      }
      language
      publisher {
        name
        __typename
      }
      imprint
      readingLevel
      series
      subtitle
      edition
      publicationYear
      note
      __typename
    }
  }
  `,
}
