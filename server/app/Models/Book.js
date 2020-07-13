'use strict'

const Env = use('Env')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Book extends Model {
  static boot() {
    super.boot()

    this.addHook('afterFetch', 'BookHook.serialize')
    this.addHook('afterFind', 'BookHook.serialize')
  }

  _serialize() {
    const API_URL = `http://${Env.get('IP_ADDRESS')}:${Env.get('PORT')}`
    this.bookUrl = `${API_URL}${this.bookUrl}`
    this.imageUrlThumb = `${API_URL}${this.imageUrlThumb}`
    this.imageUrlIntermediaria = `${API_URL}${this.imageUrlIntermediaria}`
    this.categories = this.categories.split(',')
    this.characteristics = this.characteristics.split(',')
    this.themes = this.themes.split(',')
  }

  users() {
    return this.belongsToMany('App/Models/User', 'book_id', 'user_id')
      .pivotTable('downloads')
      .withTimestamps()
  }
}

module.exports = Book
