const { existUrl, makeFailedJson } = require('../../helper/common')
const { getDom } = require('../../helper/scraping')
const { msg } = require('../../constant/pog')
const top = require('./top')
const horse = require('./horse')
const person = require('./person')
const race = require('./race')

const map = {
  '/top': $ => top($),
  '/horse': $ => horse($),
  '/person': $ => person($),
  '/race': $ => race($),
}

module.exports = async (path, req) => {
  // URL check
  if (!req.query || !req.query.url.includes(msg.POG_URL)) {
    return makeFailedJson(msg.NO_URL)
  }
  if (!(await existUrl(req.query.url))) {
    return makeFailedJson(msg.URL_ERROR)
  }

  let ret = {}
  try {
    const { $ } = await getDom(req.query.url)
    ret = map[path]($)
  } catch (e) {
    console.log(e)
    ret = makeFailedJson(msg.SERVER_ERROR)
  }
  return ret
}
