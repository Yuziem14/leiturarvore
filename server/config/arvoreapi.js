const Env = use('Env')

module.exports = {
  url: 'https://www2.arvoredelivros.com.br/graphql',
  token: Env.get('ARVORE_API_TOKEN'),
}
