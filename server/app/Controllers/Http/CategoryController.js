'use strict'

const graphql = use('App/Services/graphql')

class CategoryController {
  async index({ request, response }) {
    const { data } = await graphql.post('/', {
      query: `query {
        me {
          reader {
            categories {
              name
              slug
            }
          }
        }
      }`,
    })

    const { categories } = data.data.me.reader
    return response.json({ total: categories.length, categories: categories })
  }
}

module.exports = CategoryController
