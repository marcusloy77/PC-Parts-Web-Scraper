const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./db/db');


  // const args = process.argv.slice(2);
  // const postCode = args[0] || 2000;
let url = 'https://www.umart.com.au/pc-parts/storage-devices/ssd-hard-drives-580';
axios.get(url)
  .then((response) => {
      if(response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html); 

      let ssdsArr = $('.goods_name').text().split(" SSD")
      console.log(ssdsArr[5], ssdsArr[9], ssdsArr[10])
      ssdsArr.splice(5, 1)//removing bad element
      ssdsArr.splice(8, 1)//removing bad element
      ssdsArr.splice(8, 1)//removing bad element
      ssdsArr.splice(23, 1)//removing bad element
      ssdsArr.pop()
      console.log(ssdsArr)

      ssdsArr.forEach(ssd => {
        const sql = `
        INSERT INTO ssds(name)
        VALUES($1)
        `
        return db
          .query(sql, [ssd])
      })
}});
