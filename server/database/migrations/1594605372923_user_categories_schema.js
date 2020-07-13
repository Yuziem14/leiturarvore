'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserCategoriesSchema extends Schema {
  up() {
    this.create('user_categories', table => {
      table.increments()
      table.integer('category_id').unsigned().notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('category_id').references('id').inTable('categories')
      table.foreign('user_id').references('id').inTable('users')
      table.timestamps()
    })
  }

  down() {
    this.drop('user_categories')
  }
}

module.exports = UserCategoriesSchema
