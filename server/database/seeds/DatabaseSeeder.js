'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const ace = use('@adonisjs/ace')

const CategorySeeder = require('./CategorySeeder')
const BookSeeder = require('./BookSeeder')

/** @type {import('@adonisjs/lucid/src/Factory')} */
/** const Factory = use('Factory') */

class DatabaseSeeder {
  async run() {
    await ace.call('migration:refresh')

    await new CategorySeeder().run()
    await new BookSeeder().run()
  }
}

module.exports = DatabaseSeeder
