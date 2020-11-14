const { getEveryPersonUrl } = require('../../helper/pog')

module.exports = mainUrl => {
  const urls = getEveryPersonUrl(mainUrl)
  return { mainUrl: urls }
}
