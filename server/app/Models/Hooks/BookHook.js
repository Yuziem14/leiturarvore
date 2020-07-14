'use strict'

const BookHook = (exports = module.exports = {})

BookHook.serialize = async books => {
  if (!Array.isArray(books)) {
    books = Array(books)
  }

  books.map(book => book._serialize())
}
