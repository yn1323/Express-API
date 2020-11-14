const { POGSTARION_URL } = require('../constant/pog')
const moment = require('moment')

const getEveryPersonUrl = $ => {
  const link = []
  $('tbody .user a').each((i, e) =>
    link.push(`${POGSTARION_URL}${$(e).attr('href')}`)
  )
  return link
}

const filterIsInHouse = obj => {
  const ret = { ...obj }
  const keys = Object.keys(ret)
  const isInHouse = ret.house.reduce((acc, cur, i) => {
    if (cur === 'Ｏ') {
      acc.push(i)
    }
    return acc
  }, [])
  keys.forEach(key => {
    ret[key] = ret[key].filter((_, i) => isInHouse.includes(i))
  })
  return ret
}

const orderByDate = obj => {
  obj.sort((a, b) => {
    const aDate = moment(a.date, 'M月D日')
    const bDate = moment(b.date, 'M月D日')
    if (aDate.isSameOrBefore(b)) return 1
    if (bDate.isSameOrBefore(a)) return -1
    return 0
  })
  return obj
}

module.exports = {
  getEveryPersonUrl,
  filterIsInHouse,
  orderByDate,
}
