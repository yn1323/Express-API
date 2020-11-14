const httpClient = require('cheerio-httpcli')

const getDom = async url => await httpClient.fetch(url)

const getAllDoms = async urls => {
  const ret = []
  for (const url of urls) {
    ret.push(await httpClient.fetch(url))
  }
  return ret
}

module.exports = {
  getDom,
  getAllDoms,
}
