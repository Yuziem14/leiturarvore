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

  async show({ params, request, response }) {
    const { slug } = params || ''

    const { data } = await graphql.post('/', {
      query: queries.BOOK,
      variables: { slug },
    })

    const { bookDetails } = data.data

    response.json({ book: bookDetails })
  }
}

module.exports = BookController
