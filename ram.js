const axios = require('axios')
const cheerio = require('cheerio')

let url = 'https://www.umart.com.au/pc-parts/computer-parts/memory-ram-108'

axios.get(url)
  .then((res) => {
      if(res.status === 200) {
        const html = res.data
        // console.log(html)

        const $ = cheerio.load(html)
        // console.log($('.goods_name').text())

        const ramArr = $('.goods_name').text().split(" RAM")
        ramArr.pop()
        console.log(ramArr)

        const parsedRam = ramArr.map(ram => ramParser(ram))
        console.log(parsedRam)
      }
    })

    function ramParser(ram) {
        if (ram.includes("DDR4")) {
            return [ram, "DDR4"]
        } else if (ram.includes("DDR5")) {
            return [ram, "DDR5"]
        } 
        // else {
        //     return [null, null]
        // }
    }