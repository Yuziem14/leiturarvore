'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BooksSchema extends Schema {
  up() {
    this.create('books', table => {
      table.increments()
      table.string('name').notNullable()
      table.string('slug').notNullable()
      table.string('book_url').notNullable()
      table.string('cover_image').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('books')
  }
}

module.exports = BooksSchema
