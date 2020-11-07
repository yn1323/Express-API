const { existUrl,makeFailedJson } = require('../helper/common')
const { msg } = require('../constant/pog')


// eslint-disable-next-line
module.exports = async (path, req) => {
  // URL check
  if (!req.url || !req.url.includes(msg.POG_URL)) {
    return makeFailedJson(msg.NO_URL)
  }
  if(!await existUrl(req.query.url)){
    return makeFailedJson(msg.URL_ERROR)
  }
  console.log('ok')
  return ({aaa: 'aa'})
}
