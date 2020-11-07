const httpClient = require('cheerio-httpcli')

exports.getDom = async url => await httpClient.fetch(url)
