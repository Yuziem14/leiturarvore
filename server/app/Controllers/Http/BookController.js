'use strict'

const Book = use('App/Models/Book')
const { graphql, queries } = use('App/Services/GraphQL')

class BookController {
  async _category({ searchTerm, page, opts }) {
    const { data } = await graphql.post('/', {
      query: queries.BOOKS,
      variables: {
        searchTerm: searchTerm || '',
        page: Number(page) || 1,
        opts: opts || '',
      },
    })

    const { books } = data.data.search

    return { total: books.length, books, category: searchTerm, page, opts }
  }

  async _availableOffline(params = null) {
    const books = await Book.all()

    return { total: books.length, books: books }
  }

  async _search({ searchTerm, page, opts }) {
    const { data } = await graphql.post('/', {
      query: queries.SEARCH,
      variables: {
        searchTerm: decodeURIComponent(searchTerm) || '',
        page: Number(page) || 1,
        opts: opts || '',
      },
    })

    const { books } = data.data.search

    return { total: books.length, books, search: searchTerm, page, opts }
  }

  async _viewed(params = null) {
    const { data } = await graphql.post('/', {
      query: queries.VIEWED_BOOKS,
    })

    const { viewedBooks } = data.data.me.reader

    return { total: viewedBooks.length, books: viewedBooks }
  }

  async index({ request, response }) {
    const { searchTerm, page, opts, filter } = request.all()

    if (typeof this[`_${filter}`] !== 'function') {
      return response
        .status(400)
        .json({ error: { message: `filter '${filter}' is not valid` } })
    }

    const data = await this[`_${filter}`]({ searchTerm, page, opts })

    return response.json(data)
  }

  async show({ params, request, response }) {
    const { slug } = params
    const book = await Book.findBy('slug', slug)

    if (!book) {
      const { data } = await graphql.post('/', {
        query: queries.BOOK,
        variables: { slug: slug || '' },
      })
      const { bookDetails } = data.data
      return response.json({ book: bookDetails })
    }

    return response.json({ book: book.toJSON(), origin: 'leiturarvore' })
  }
}

module.exports = BookController
