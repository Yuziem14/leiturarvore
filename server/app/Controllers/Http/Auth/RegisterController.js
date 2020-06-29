'use strict'

const User = use('App/Models/User')

class RegisterController {
  async store({ request, response }) {
    const data = request.only(['name', 'email', 'password'])
    const { categories } = request.all()

    const user = await User.create(data)
    await user.categories().createMany(categories)

    return response.json({ id: user.id })
  }
}

module.exports = RegisterController
