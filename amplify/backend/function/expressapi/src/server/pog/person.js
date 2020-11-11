module.exports = $ => {
  const header = [
    { text: 'No', value: 'order' },
    { text: '馬名', value: 'horse' },
    { text: '馬齢', value: 'birth' },
    { text: '在厩', value: 'house' },
    { text: '賞金', value: 'prize' },
  ]
  const tbody = {}
  const meta = {
    horse: [],
    birth: [],
    house: [],
    prize: [],
    score: [],
    recent: [],
    blood: [],
  }
  const selectors = [
    { key: 'horse', selector: 'tbody td:nth-child(2)' },
    { key: 'birth', selector: 'tbody td:nth-child(4)' },
    { key: 'house', selector: 'tbody td:nth-child(5)' },
    { key: 'prize', selector: 'tbody td:nth-child(8)' },
    { key: 'score', selector: 'tbody .sogochakukaisu1' },
    { key: 'recent', selector: 'tbody .new_syokin' },
    { key: 'blood', selector: 'tbody .ketto' },
  ]
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

  tbody.order = meta.horse.map((_, i) => i + 1)
  tbody.horse = [...meta.horse]
  tbody.birth = [...meta.birth]
  tbody.house = [...meta.horse]
  tbody.prize = [...meta.prize]

  return { meta, header, tbody }
}
