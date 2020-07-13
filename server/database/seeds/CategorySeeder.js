'use strict'

/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Category = use('App/Models/Category')

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')

class CategorySeeder {
  async run() {
    await Category.createMany([
      {
        name: 'Artes',
        slug: 'artes',
      },
      {
        name: 'Autoajuda',
        slug: 'autoajuda',
      },
      {
        name: 'Biografias e autobiografias',
        slug: 'biografias-e-autobiografias',
      },
      {
        name: 'Casa e lar',
        slug: 'casa-e-lar',
      },
      {
        name: 'Ciências da natureza',
        slug: 'ciencias-da-natureza',
      },
      {
        name: 'Ciências humanas e sociais',
        slug: 'ciencias-humanas-e-sociais',
      },
      {
        name: 'Contos',
        slug: 'contos',
      },
      {
        name: 'Dicionários e referência',
        slug: 'dicionarios-e-referencia',
      },
      {
        name: 'Educação',
        slug: 'educacao',
      },
      {
        name: 'Esoterismo',
        slug: 'esoterismo',
      },
      {
        name: 'Fantasia',
        slug: 'fantasia',
      },
      {
        name: 'Ficção científica',
        slug: 'ficcao-cientifica',
      },
      {
        name: 'Games',
        slug: 'games',
      },
      {
        name: 'História em quadrinhos',
        slug: 'historia-em-quadrinhos',
      },
      {
        name: 'Lendas e mitos',
        slug: 'lendas-e-mitos',
      },
      {
        name: 'Literatura',
        slug: 'literatura',
      },
      {
        name: 'Literatura infantojuvenil',
        slug: 'literatura-infantojuvenil',
      },
      {
        name: 'Matemática',
        slug: 'matematica',
      },
      {
        name: 'Mistério, policial e terror',
        slug: 'misterio-policial-e-terror',
      },
      {
        name: 'Negócios e economia',
        slug: 'negocios-e-economia',
      },
      {
        name: 'Periódico infantojuvenil',
        slug: 'periodico-infantojuvenil',
      },
      {
        name: 'Periódicos',
        slug: 'periodicos',
      },
      {
        name: 'Religião e espiritualidade',
        slug: 'religiao-e-espiritualidade',
      },
      {
        name: 'Romântico',
        slug: 'romantico',
      },
      {
        name: 'Saúde e bem-estar',
        slug: 'saude-e-bem-estar',
      },
      {
        name: 'Tecnologia e engenharia',
        slug: 'tecnologia-e-engenharia',
      },
      {
        name: 'Viagem e turismo',
        slug: 'viagem-e-turismo',
      },
    ])
  }
}

module.exports = CategorySeeder
