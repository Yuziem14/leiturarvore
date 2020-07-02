'use strict'

const BookController = require('../app/Controllers/Http/BookController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'LeiturÁvore API' }
})

Route.post('register', 'Auth/RegisterController.store')
Route.post('signin', 'Auth/SessionController.store')
Route.post('refresh', 'Auth/SessionController.update')
Route.get('user/categories', 'UserCategoryController.index').middleware([
  'auth',
])

Route.get('categories', 'CategoryController.index')
Route.get('books', 'BookController.index').middleware(['auth'])
Route.get('search/:searchTerm', 'BookController.search').middleware(['auth'])
Route.get('/viewed-books', 'BookController.viewed').middleware(['auth'])
