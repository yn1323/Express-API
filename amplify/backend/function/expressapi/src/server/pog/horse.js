const { getHorseScraping } = require('../../constant/pog')
const { sortFragmentObject } = require('../../helper/common')
const { getEveryPersonUrl } = require('../../helper/pog')
const { getAllDoms } = require('../../helper/scraping')
const getPersonData = require('./person')

module.exports = async mainUrl => {
  const urls = getEveryPersonUrl(mainUrl)
  const $$ = (await getAllDoms(urls)).map(({ $ }) => $)
  const { meta, tbody, header } = getHorseScraping()
  const metaKeys = Object.keys(meta)

  // とりあえずmetaにすべてつっこむ
  $$.forEach($ => {
    const allData = getPersonData($)
    metaKeys.forEach(key => (meta[key] = [...meta[key], ...allData.meta[key]]))
  })

  // ソート
  const sortedMeta = sortFragmentObject(meta, 'prize')

  header.forEach(({ value }) => (tbody[value] = sortedMeta[value]))
  tbody.order = sortedMeta.horse.map((_, i) => i + 1)

  return { meta: sortedMeta, header, tbody }
}
