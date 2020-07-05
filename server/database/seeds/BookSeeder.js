'use strict'

/*
|--------------------------------------------------------------------------
| BookSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Book = use('App/Models/Book')

/** @type {import('@adonisjs/lucid/src/Factory')} */
/** const Factory = use('Factory') */

class BookSeeder {
  async run() {
    const staticURL = `/books`

    const books = [
      {
        name: 'Esaú e Jacó',
        slug: 'esau-e-jaco',
        book_url: `${staticURL}/esau-e-jaco.epub`,
        cover_image: `${staticURL}/esau-e-jaco.jpg`,
      },
      {
        name: 'Memórias de um sargento de milícias',
        slug: 'manuel-antonio-de-almeida-memorias-de-um-sargento-de-milicias',
        book_url: `${staticURL}/memorias-de-um-sargento-de-milicias.epub`,
        cover_image: `${staticURL}/memorias-de-um-sargento-de-milicias.jpg`,
      },
      {
        name: 'Quincas Borba',
        slug: 'quincas-borba',
        book_url: `${staticURL}/quincas-borba.epub`,
        cover_image: `${staticURL}/quincas-borba.jpg`,
      },
      {
        name: 'Senhora',
        slug: 'jose-de-alencar-senhora',
        book_url: `${staticURL}/senhora.epub`,
        cover_image: `${staticURL}/senhora.jpg`,
      },
      {
        name: 'Dom Casmurro',
        slug: 'machado-de-assis-dom-casmurro',
        book_url: `${staticURL}/dom-casmurro.epub`,
        cover_image: `${staticURL}/dom-casmurro.jpg`,
      },
      {
        name: 'Alma inquieta',
        slug: 'alma-inquieta',
        book_url: `${staticURL}/alma-inquieta.epub`,
        cover_image: `${staticURL}/alma-inquieta.jpg`,
      },
      {
        name: 'O caçador de esmeraldas',
        slug: 'o-cacador-de-esmeraldas',
        book_url: `${staticURL}/o-cacador-de-esmeraldas.epub`,
        cover_image: `${staticURL}/o-cacador-de-esmeraldas.jpg`,
      },
      {
        name: 'Panóplias',
        slug: 'panoplias',
        book_url: `${staticURL}/panoplias.epub`,
        cover_image: `${staticURL}/panoplias.jpg`,
      },
      {
        name: 'Tarde',
        slug: 'tarde',
        book_url: `${staticURL}/tarde.epub`,
        cover_image: `${staticURL}/tarde.jpg`,
      },
      {
        name: 'Via-Láctea',
        slug: 'via-lactea',
        book_url: `${staticURL}/via-lactea.epub`,
        cover_image: `${staticURL}/via-lactea.jpg`,
      },
      {
        name: 'Suspiros poéticos e saudades',
        slug: 'suspiros-poeticos-e-saudades',
        book_url: `${staticURL}/suspiros-poeticos-e-saudades.epub`,
        cover_image: `${staticURL}/suspiros-poeticos-e-saudades.jpg`,
      },
      {
        name: 'O Guarani',
        slug: 'o-guarani-295ebd51-bd09-453e-801e-58ae3fd35514',
        book_url: `${staticURL}/o-guarani.epub`,
        cover_image: `${staticURL}/o-guarani.jpg`,
      },
      {
        name: 'Cinco minutos',
        slug: 'cinco-minutos',
        book_url: `${staticURL}/cinco-minutos.epub`,
        cover_image: `${staticURL}/cinco-minutos.jpg`,
      },
      {
        name: 'A Viuvinha',
        slug: 'a-viuvinha',
        book_url: `${staticURL}/a-viuvinha.epub`,
        cover_image: `${staticURL}/a-viuvinha.jpg`,
      },
      {
        name: 'Helena',
        slug: 'helena-e217f69c-b1a8-4413-b378-9c4c8f9ccb79',
        book_url: `${staticURL}/helena.epub`,
        cover_image: `${staticURL}/helena.jpg`,
      },
      {
        name: 'Obras poéticas',
        slug: 'obras-poeticas',
        book_url: `${staticURL}/obras-poeticas.epub`,
        cover_image: `${staticURL}/obras-poeticas.jpg`,
      },
      {
        name: 'Sai fora, coronavírus!',
        slug: 'sai-fora-coronavirus',
        cover_image: `${staticURL}/sai-fora-coronavirus.jpg`,
        book_url: `${staticURL}/sai-fora-coronavirus.pdf`,
      },
      {
        name: 'Cabelo bom é o que?',
        slug: 'cabelo-bom-o-que-e',
        cover_image: `${staticURL}/cabelo-bom-o-que-e.jpg`,
        book_url: `${staticURL}/cabelo-bom-o-que-e.pdf`,
      },
      {
        name: 'Mínimos contos - suspense em 140 caracteres',
        slug: 'minimos-contos',
        cover_image: `${staticURL}/minimos-contos.jpg`,
        book_url: `${staticURL}/minimos-contos.pdf`,
      },
      {
        name: 'O devaneio no jardim',
        slug: 'o-devaneio-no-jardim',
        cover_image: `${staticURL}/o-devaneio-no-jardim.jpg`,
        book_url: `${staticURL}/o-devaneio-no-jardim.pdf`,
      },
    ]

    await Book.createMany(books)
  }
}

module.exports = BookSeeder
