'use strict'

const Category = use('App/Models/Category')
const { graphql, queries } = use('App/Services/GraphQL')

class CategoryController {
  async _fetchCategories() {
    const { data } = await graphql.post('/', {
      query: queries.CATEGORIES,
    })

    const { categories } = data.data.me.reader
    return categories
  }

  async index({ response }) {
    let categories = (
      await Category.query().select('name', 'slug').fetch()
    ).toJSON()

    if (categories.length === 0) {
      categories = await this._fetchCategories()
    }

    return response.json({ total: categories.length, categories })
  }
}

module.exports = CategoryController
