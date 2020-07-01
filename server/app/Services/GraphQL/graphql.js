const Config = use('Config')
const axios = require('axios')

const token = Config.get('arvoreapi.token')
const baseURL = Config.get('arvoreapi.url')

const graphql = axios.create({
  baseURL,
})

graphql.interceptors.request.use(config => {
  config.headers.common.Authorization = `Bearer ${token}`
  return config
})

module.exports = graphql
