'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  users() {
    return this.belongsToMany('App/Models/User', 'category_id', 'user_id')
      .pivotTable('user_categories')
      .withTimestamps()
  }
}

module.exports = Category
