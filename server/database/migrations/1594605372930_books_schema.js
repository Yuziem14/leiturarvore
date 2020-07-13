'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BooksSchema extends Schema {
  up() {
    this.create('books', table => {
      table.increments()
      table.string('slug').notNullable()
      table.string('name').notNullable()
      table.string('author').notNullable()
      table.text('description').nullable()
      table.string('edition', 150).nullable()
      table.string('language', 150).nullable()
      table.string('publisher', 150).notNullable()
      table.text('categories').nullable()
      table.text('characteristics').nullable()
      table.text('themes').nullable()
      table.string('imageUrlThumb').nullable()
      table.string('imageUrlIntermediaria').nullable()
      table.string('bookUrl').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('books')
  }
}

module.exports = BooksSchema
