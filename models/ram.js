const axios = require('axios')
const cheerio = require('cheerio')
const db = require('../db/db');

let url = 'https://www.umart.com.au/pc-parts/computer-parts/memory-ram-108'

function ram(pages) {
for (let page =1; page <= pages; page++){
axios.get(url)
  .then((res) => {
      if(res.status === 200) {
        const html = res.data
        // console.log(html)

        const $ = cheerio.load(html)
        // console.log($('.goods_name').text())

        let ramArr = $('.goods_name').text().split(/(?=Silicon Power)|(?=ADATA)|(?=Crucial)|(?=Kingston)|(?=Gigabyte)|(?=Corsair)|(?=Vengeance)/)
        ramArr.pop()
        // ramArr = ramArr.filter(ram => ram.length < 50)
        // ramArr = ramArr.filter(ram => ram.length > 10)


        const parsedRam = ramArr.map(ram => ramParser(ram))
        console.log(parsedRam)
        parsedRam.forEach(ram => {
            const sql = `
            INSERT INTO ram(name, type)
            VALUES($1, $2)
            `
            return db
              .query(sql, ram)
          })
      }
    })
}
}
function ramParser(ram) {
    if (ram.includes("DDR4")) {
        return [ram, "DDR4"]
    } else if (ram.includes("DDR5")) {
        return [ram, "DDR5"]
    } else if (ram.includes("DDR3")) {
        return [ram, "DDR3"]
    } else {
        return [ram, null]
    }
}

module.exports = ram
