'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

const UserHook = (exports = module.exports = {})

UserHook.hashPassword = async user => {
  if (user.dirty.password) {
    user.password = await Hash.make(user.password)
  }
}

UserHook.deleteRelations = async user => {
  await Promise.all([user.categories().detach(), user.books().detach()])
}
