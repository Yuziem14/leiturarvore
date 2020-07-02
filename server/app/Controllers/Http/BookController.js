'use strict'

const { graphql, queries } = use('App/Services/GraphQL')

class BookController {
  async index({ request, response }) {
    const { category } = request.get('category') || ' '
    const { opts } = request.get('opts') || ''
    const { page } = request.get('page')

    const { data } = await graphql.post('/', {
      query: queries.BOOKS,
      variables: {
        searchTerm: category,
        page: Number(page) || 1,
        opts,
      },
    })

    const { books } = data.data.search

    return response.json({ books, total: books.length, category, page })
  }

  async search({ params, request, response }) {
    const searchTerm = params.searchTerm || ''
    const { opts } = request.get('opts') || ''
    const { page } = request.get('page')
    console.log(searchTerm)
    const { data } = await graphql.post('/', {
      query: queries.SEARCH,
      variables: {
        searchTerm,
        page: Number(page) || 1,
        opts,
      },
    })

    const items = data.data.searchBook.books

    return response.json({ total: items.length, opts, page, items })
  }

  async viewed({ response }) {
    const { data } = await graphql.post('/', {
      query: queries.VIEWED_BOOKS,
    })

    const { viewedBooks } = data.data.me.reader
    return response.json({ total: viewedBooks.length, viewedBooks })
  }
}

module.exports = BookController
