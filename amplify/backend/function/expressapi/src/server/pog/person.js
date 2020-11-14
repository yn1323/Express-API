const { getPersonScraping } = require('../../constant/pog')

module.exports = $ => {
  const { header, tbody, meta, selectors } = getPersonScraping()
  selectors.forEach(v =>
    $(v.selector).each((_, e) => meta[v.key].push($(e).text().trim()))
  )
  // 血統の修正
  meta.blood = meta.blood.map(v => {
    const [father, mother] = v
      .replace('父', '')
      .replace('母', '')
      .split('\r\n')
      .map(vv => vv.trim())
    return { father, mother }
  })

  header.forEach(({ value }) => (tbody[value] = meta[value]))
  tbody.order = meta.horse.map((_, i) => i + 1)

  return { meta, header, tbody }
}
