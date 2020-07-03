'use strict'

class ProfileController {
  async index({ auth, request, response }) {
    const categories = await auth.user
      .categories()
      .select('name', 'slug')
      .fetch()

    return response.json({
      ...auth.user.toJSON(),
      categories: categories.toJSON(),
    })
  }
}

module.exports = ProfileController
