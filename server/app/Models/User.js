'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', 'UserHook.hashPassword')

    this.addHook('beforeDelete', 'UserHook.deleteRelations')
  }

  static get hidden() {
    return ['password']
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  books() {
    return this.belongsToMany('App/Models/Book', 'user_id', 'book_id')
      .pivotTable('downloads')
      .withTimestamps()
  }

  categories() {
    return this.belongsToMany('App/Models/Category', 'user_id', 'category_id')
      .pivotTable('user_categories')
      .withTimestamps()
  }
}

module.exports = User
