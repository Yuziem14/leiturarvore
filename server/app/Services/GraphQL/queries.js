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
  VIEWED_BOOKS: `${BOOK_FRAGMENT}
    query {
      me {
        reader {
          viewedBooks(last:10) {
            book {
              ...bookNavigationFields
            }
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
  }`,
  SEARCH: `${BOOK_FRAGMENT}
  
  query SearchBookWithFiltersQuery($searchTerm: String!, $page: Int, $opts: String) {
    searchBook: searchBookV2(searchTerm: $searchTerm, page: $page, opts: $opts) { 
      books {
        ...bookNavigationFields
        __typename
      }
      __typename  
    }
  }`,
}
