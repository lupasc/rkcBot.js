async function mapAsync (_array, _cb) {
  
  const promises = _array.map(async (_item, idx) => {  
      return await _cb(_item)
  })

  return await Promise.all(promises)
}

module.exports = mapAsync