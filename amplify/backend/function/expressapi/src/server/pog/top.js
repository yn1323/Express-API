const { getTopScraping } = require('../../constant/pog')
const { getEveryPersonUrl } = require('../../helper/pog')

module.exports = $ => {
  const { header, tbody, meta, selectors } = getTopScraping()
  selectors.forEach(v =>
    $(v.selector).each((_, e) => meta[v.key].push($(e).text().trim()))
  )
  meta.url = getEveryPersonUrl($)

  header.forEach(({ value }) => (tbody[value] = meta[value]))
  tbody.order = meta.user.map((_, i) => i + 1)

  return { meta, header, tbody }
}
