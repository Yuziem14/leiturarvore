'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserCategory extends Model {
  get table() {
    return 'user_categories'
  }
}

module.exports = UserCategory
