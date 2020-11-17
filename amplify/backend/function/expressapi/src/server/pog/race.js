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
  const weather = data1[2] ? data1[2].replace('天候:', '') : ''
  const ground = data1[3] ? data1[3].replace('馬場:', '') : ''
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

const getHorseInfo = $ => {
  const horseNames = []
  // 馬名取得
  $('.HorseList').each((_, e) =>
    $(e).each((_, f) => {
      horseNames.push($(f).find('.HorseInfo').text().trim())
    })
  )
  return horseNames
}

module.exports = async $ => {
  const raceInfo = getRaceInfo($)
  const horseInfo = getHorseInfo($)

  return { raceInfo, horseInfo }
}
