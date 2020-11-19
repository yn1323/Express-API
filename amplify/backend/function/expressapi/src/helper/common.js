const urlExist = require('url-exists-async-await')
const moment = require('moment')

const existUrl = async data => {
  let result = false
  try {
    result = await urlExist(data)
    // eslint-disable-next-line no-empty
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

const weekDaysList = () => {
  const today = moment()
  const days = []
  for (let i = 0; i < 7; i++) {
    days.push(today.clone().add(i, 'days').format('YYYYMMDD'))
  }
  return days
}

const hasDuplicate = (arr1, arr2) => {
  for (let v of arr1) {
    if (arr2.includes(v)) {
      return true
    }
  }
  return false
}

const getDuplicateIndex = (baseArr, targetArr) => {
  const index = []
  const len = baseArr.length
  for (let i = 0; i < len; i++) {
    if (targetArr.includes(baseArr[i])) {
      index.push(i)
    }
  }
  return index
}

const makeTbody = tbody => {
  const keys = Object.keys(tbody)
  const len = tbody[keys[0]].length
  const ret = []
  for (let i = 0; i < len; i++) {
    const tmp = {}
    keys.forEach(key => {
      tmp[key] = tbody[key][i]
    })
    ret.push(tmp)
  }
  return ret
}

module.exports = {
  existUrl,
  makeFailedJson,
  sortFragmentObject,
  weekDaysList,
  hasDuplicate,
  getDuplicateIndex,
  makeTbody,
}
