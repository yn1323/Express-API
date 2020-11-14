const { POGSTARION_URL } = require('../constant/pog')

const getEveryPersonUrl = $ => {
  const link = []
  $('tbody .user a').each((i, e) =>
    link.push(`${POGSTARION_URL}${$(e).attr('href')}`)
  )
  return link
}

module.exports = {
  getEveryPersonUrl,
}
