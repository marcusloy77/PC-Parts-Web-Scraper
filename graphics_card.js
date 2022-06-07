const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./db/db');


  // const args = process.argv.slice(2);
  // const postCode = args[0] || 2000;
let url = 'https://www.umart.com.au/pc-parts/computer-parts/graphics-cards-gpu-610';
cardsArr = axios.get(url)
  .then((response) => {
      if(response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html); 

      cardsArr = $('.goods_name').text().split(" Graphics Card")
      cardsArr.pop()

      cardsArr.forEach(card => {
        const sql = `
        INSERT INTO graphics_cards(name)
        VALUES($1)
        `
        return db
          .query(sql, [card])
      })
}});
