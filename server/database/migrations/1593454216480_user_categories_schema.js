'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserCategoriesSchema extends Schema {
  up() {
    this.create('user_categories', table => {
      table.increments()
      table.string('name', 150).nullable()
      table.string('slug', 150).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down() {
    this.drop('user_categories')
  }
}

module.exports = UserCategoriesSchema
