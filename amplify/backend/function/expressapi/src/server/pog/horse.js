const { POGSTARION_URL } = require('../../constant/pog')

module.exports = $ => {
  const header = [
    { text: '順位', value: 'order' },
    { text: 'ユーザー名', value: 'user' },
    { text: '本賞金', value: 'prize' },
    { text: '直近', value: 'recent' },
  ]
  const user = [],
    prize = [],
    recent = [],
    link = []
  // forEach, mapの引数がES2015とcheerioで異なることに注意
  $('tbody .user').each((_, e) => user.push($(e).text().trim()))
  $('tbody .money').each((_, e) => prize.push($(e).text().trim()))
  $('tbody .recent').each((_, e) => recent.push($(e).text().trim()))
  $('tbody .user a').each((i, e) =>
    link.push({ order: i + 1, url: `${POGSTARION_URL}${$(e).attr('href')}` })
  )
  const order = user.map((_, i) => i + 1)

  const tbody = []
  user.forEach((_, i) => {
    tbody.push({
      order: order[i],
      prize: prize[i],
      recent: recent[i],
      user: user[i],
    })
  })

  const meta = { link }
  return { ok: 'ok' }
}
