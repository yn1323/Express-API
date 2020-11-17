const { NET_KEIBA_URL, NETKEIBA_RACE_DAY_URL } = require('../../constant/pog')
const { weekDaysList } = require('../../helper/common')
const { filterIsInHouse } = require('../../helper/pog')
const { getAllDoms } = require('../../helper/scraping')
const getHorseData = require('./horse')

module.exports = async mainUrl => {
  const { meta } = await getHorseData(mainUrl)
  const filteredMeta = filterIsInHouse(meta)

  // レーススケジュール
  const racesInDayUrls = weekDaysList().map(date => NETKEIBA_RACE_DAY_URL(date))

  const raceScheduleUrls = (await getAllDoms(racesInDayUrls)).map(({ $ }) => $)
  const url = raceScheduleUrls.reduce((acc, $) => {
    const lists = $('.RaceList_DataItem')
    $(lists).each((_, e) => {
      acc.push(
        `${NET_KEIBA_URL}${$(e)
          .find('a:nth-child(1)')
          .attr('href')
          .replace('../', '')}`
      )
    })
    return acc
  }, [])
  filteredMeta.url = url

  return { meta: filteredMeta, url }
}
