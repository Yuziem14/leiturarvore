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
}
