const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./db/db');
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()


  // const args = process.argv.slice(2);
  // const postCode = args[0] || 2000;
  
for (let page =1; page <= 3; page++){
  let url = 'https://www.umart.com.au/pc-parts/storage-devices/ssd-hard-drives-580';
  axios.get(url)
    .then((response) => {
        if(response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html); 

        let ssdsArr = $('.goods_name').text().split(" SSD")
        ssdsArr.pop()
        
        ssdsArr = ssdsArr.filter(card => alphabet.includes(card.charAt(0)))
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
}