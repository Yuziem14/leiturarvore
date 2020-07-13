'use strict'

/*
|--------------------------------------------------------------------------
| BookSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Book = use('App/Models/Book')

/** @type {import('@adonisjs/lucid/src/Factory')} */
/** const Factory = use('Factory') */

const { books } = require('../mocks/books.json')

class BookSeeder {
  async run() {
    await Book.createMany(books)
  }
}

module.exports = BookSeeder
