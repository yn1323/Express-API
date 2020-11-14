const { NET_KEIBA_URL, NETKEIBA_RACE_DAY_URL } = require('../../constant/pog')
const {
  hasDuplicate,
  getDuplicateIndex,
  weekDaysList,
} = require('../../helper/common')
const { filterIsInHouse, orderByDate } = require('../../helper/pog')
const { getAllDoms } = require('../../helper/scraping')
const getHorseData = require('./horse')

const getRaceInfo = $ => {
  const date = $('#RaceList_DateList').find('.Active').find('a').attr('title')
  const place = $('.RaceKaisaiWrap').find('.Active').text().trim()
  const title = $('.RaceName').text().trim()
  const round = $('.RaceNum').text().trim()
  const data1 = $('.RaceData01')
    .text()
    .trim()
    .replace('\n', '')
    .replace('\n', '')
    .replace('\n', '')
    .split('/')
    .map(v => v.trim())
  const time = data1[0]
  const distance = data1[1]
  const weather = data1[2].replace('天候:', '')
  const ground = data1[3].replace('馬場:', '')
  const target = `${$('.RaceData02 span:nth-child(4)').text().trim()}/${$(
    '.RaceData02 span:nth-child(5)'
  )
    .text()
    .trim()}`
  const count = $('.RaceData02 span:nth-child(8)').text().trim()
  const prize = $('.RaceData02 *:nth-child(10)')
    .text()
    .trim()
    .replace('本賞金:', '')
    .replace('万円', '')
    .split(',')
  return {
    date,
    place,
    title,
    round,
    time,
    distance,
    weather,
    ground,
    target,
    count,
    prize,
  }
}

module.exports = async mainUrl => {
  const { meta } = await getHorseData(mainUrl)
  const filteredMeta = filterIsInHouse(meta)

  // レーススケジュール
  const racesInDayUrls = weekDaysList().map(date => NETKEIBA_RACE_DAY_URL(date))

  const raceScheduleUrls = (await getAllDoms(racesInDayUrls)).map(({ $ }) => $)
  const allRaceUrls = raceScheduleUrls.reduce((acc, $) => {
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
  filteredMeta.url = allRaceUrls
  // レースごと
  const allRaceDetail = (await getAllDoms(allRaceUrls)).map(({ $ }) => $)

  const race = allRaceDetail.reduce((acc, $, index) => {
    const horseNames = []
    // 馬名取得
    $('.HorseList').each((_, e) =>
      $(e).each((_, f) => {
        horseNames.push($(f).find('.HorseInfo').text().trim())
      })
    )

    // 対象なし
    if (!hasDuplicate(filteredMeta.horse, horseNames)) return acc

    const url = allRaceUrls[index]
    // レース情報の追加
    const raceInfo = getRaceInfo($)
    const targetRows = getDuplicateIndex(horseNames, filteredMeta.horse)

    $('.HorseList').each((i, e) => {
      if (!targetRows.includes(i)) {
        return
      }
      const horse = $(e).find('.HorseInfo').text().trim()
      // フロントで読み込まれるので厳しい
      // const fav = $(e).find('td:nth-child(11)').text().trim()
      // const odds = $(e).find('td:nth-child(10)').text().trim()

      const metaIndex = filteredMeta.horse.indexOf(horse)
      acc.push({
        horse,
        ...raceInfo,
        url,
        user: filteredMeta.user[metaIndex],
        metaIndex,
      })
      return acc
    })

    return acc
  }, [])
  const orderedRace = orderByDate(race)

  return { meta: filteredMeta, race: orderedRace }
}
