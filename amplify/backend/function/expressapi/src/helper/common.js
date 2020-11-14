const urlExist = require('url-exists-async-await')

exports.existUrl = async data => {
  let result = false
  try {
    result = await urlExist(data)
  } catch {}
  return result
}
exports.makeFailedJson = msg => ({ failed: msg })
