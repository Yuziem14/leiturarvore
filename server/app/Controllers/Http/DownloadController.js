'use strict'

const Book = use('App/Models/Book')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with downloads
 */
class DownloadController {
  /**
   * Show a list of all downloads.
   * GET downloads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth, request, response, view }) {
    const downloads = await auth.user.books().fetch()

    return response.json({ downloads: downloads.toJSON() })
  }

  /**
   * Create/save a new download.
   * POST downloads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const { slug } = request.all()
    const book = await Book.findByOrFail('slug', slug)
    await auth.user.books().attach([book.id])

    return response.json({ bookId: book.id })
  }

  /**
   * Delete a download with id.
   * DELETE downloads/:slug
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ auth, params, request, response }) {
    const { slug } = params
    const book = await Book.findByOrFail('slug', slug)
    await auth.user.books().detach([book.id])
  }
}

module.exports = DownloadController
