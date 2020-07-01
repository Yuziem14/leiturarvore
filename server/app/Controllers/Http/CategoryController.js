'use strict'

const { graphql, queries } = use('App/Services/GraphQL')

class CategoryController {
  async index({ request, response }) {
    const { data } = await graphql.post('/', {
      query: queries.CATEGORIES,
    })

    const { categories } = data.data.me.reader
    return response.json({ total: categories.length, categories })
  }
}

module.exports = CategoryController
