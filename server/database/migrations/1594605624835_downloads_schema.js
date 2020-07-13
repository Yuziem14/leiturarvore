'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DownloadsSchema extends Schema {
  up() {
    this.create('downloads', table => {
      table.increments()
      table.integer('book_id').unsigned().notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('downloads')
  }
}

module.exports = DownloadsSchema
