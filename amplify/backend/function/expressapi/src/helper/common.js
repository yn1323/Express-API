const urlExist = require('url-exists-async-await')

const existUrl = async data => {
  let result = false
  try {
    result = await urlExist(data)
  } catch {}
  return result
}

const makeFailedJson = msg => ({ failed: msg })

const findMaxIndex = arr => {
  let maxIndex = 0
  arr.forEach((v, index) => {
    const cur = parseInt(v, 10)
    const compare = parseInt(arr[maxIndex], 10)
    maxIndex = cur >= compare ? index : maxIndex
  })
  return maxIndex
}

// {a: [5,3,8], b: ['a','b','c']} => {a: [3,5,8], b: ['b','a','c']}
const sortFragmentObject = (obj, key, order, acc = {}) => {
  const keys = Object.keys(obj)
  order = order || 'desc'
  if (!Object.keys(acc).length) {
    keys.forEach(key => (acc[key] = []))
  }
  const index = findMaxIndex(obj[key])
  keys.forEach(key => {
    acc[key].push(obj[key][index])
    obj[key].splice(index, 1)
  })

  return obj[keys[0]].length ? sortFragmentObject(obj, key, order, acc) : acc
}

module.exports = {
  existUrl,
  makeFailedJson,
  sortFragmentObject,
}
