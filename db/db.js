const pg = require('pg')

const db = new pg.Pool({
  database: 'pc_db'
})

module.exports = db