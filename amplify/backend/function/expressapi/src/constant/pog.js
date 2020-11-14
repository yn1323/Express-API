exports.msg = {
  NO_URL: 'POG STARIONのURLではありません。',
  URL_ERROR: 'アクセスできないURLです。',
  POG_URL: 'http://pogstarion.com/',
  SERVER_ERROR: 'Sever Error.',
}

exports.POGSTARION_URL = 'http://pogstarion.com/'

exports.getTopScraping = () => ({
  header: [
    { text: '順位', value: 'order' },
    { text: 'ユーザー名', value: 'user' },
    { text: '本賞金', value: 'prize' },
    { text: '直近', value: 'recent' },
  ],
  tbody: {},
  meta: {
    user: [],
    prize: [],
    recent: [],
    url: [],
  },
  selectors: [
    { key: 'user', selector: 'tbody .user' },
    { key: 'prize', selector: 'tbody .money' },
    { key: 'recent', selector: 'tbody .recent' },
  ],
})

exports.getPersonScraping = () => ({
  header: [
    { text: 'No', value: 'order' },
    { text: '馬名', value: 'horse' },
    { text: '馬齢', value: 'birth' },
    { text: '在厩', value: 'house' },
    { text: '賞金', value: 'prize' },
  ],
  tbody: {},
  meta: {
    horse: [],
    birth: [],
    house: [],
    prize: [],
    score: [],
    recent: [],
    blood: [],
  },
  selectors: [
    { key: 'horse', selector: 'tbody td:nth-child(2)' },
    { key: 'birth', selector: 'tbody td:nth-child(4)' },
    { key: 'house', selector: 'tbody td:nth-child(5)' },
    { key: 'prize', selector: 'tbody td:nth-child(8)' },
    { key: 'score', selector: 'tbody .sogochakukaisu1' },
    { key: 'recent', selector: 'tbody .new_syokin' },
    { key: 'blood', selector: 'tbody .ketto' },
  ],
})
