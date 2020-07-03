'use strict'

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

Route.post('auth/register', 'Auth/RegisterController.store')
Route.post('auth/signin', 'Auth/SessionController.store')
Route.post('auth/refresh', 'Auth/SessionController.update')
Route.get('/profile', 'Auth/ProfileController.index').middleware(['auth'])

Route.get('categories', 'CategoryController.index')
Route.get('books', 'BookController.index').middleware(['auth'])
Route.get('books/:slug', 'BookController.show').middleware(['auth'])
