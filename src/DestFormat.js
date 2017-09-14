const simpleDate = function () {
  let dt = new Date()
  return dt.toISOString().split('.')[0].replace('T', '_')
}
const destFormat = function (driver, path, database) {
  return `${path}/bkp_${driver}_${database}_${simpleDate()}.sql`
}

module.exports = destFormat