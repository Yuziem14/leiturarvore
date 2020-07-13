'use strict'

class ProfileController {
  async index({ auth, request, response }) {
    const categories = await auth.user
      .categories()
      .select('name', 'slug')
      .fetch()

    const downloads = await auth.user.books().fetch()

    return response.json({
      ...auth.user.toJSON(),
      downloads: downloads.toJSON(),
      categories: categories.toJSON(),
    })
  }
}

module.exports = ProfileController
