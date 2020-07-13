'use strict'

const User = use('App/Models/User')
const Category = use('App/Models/Category')

class RegisterController {
  async store({ request, response }) {
    const data = request.only(['name', 'email', 'password'])
    const { categories: favCategories } = request.all()

    const slugs = favCategories.map(({ slug }) => slug)

    const categories = (
      await Category.query().whereIn('slug', slugs).select('id').fetch()
    )
      .toJSON()
      .map(({ id }) => id)

    const user = await User.create(data)

    await user.categories().attach(categories)

    return response.json({ id: user.id })
  }
}

module.exports = RegisterController
