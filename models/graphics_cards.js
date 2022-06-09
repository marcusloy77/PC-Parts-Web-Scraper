const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../db/db');
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()

  // const args = process.argv.slice(2);
  // const postCode = args[0] || 2000;
function gpus(pages) {
  for (let page =1; page <= pages; page++){
    let url = `https://www.umart.com.au/pc-parts/computer-parts/graphics-cards-gpu-610?page=${page}`;
    axios.get(url)
      .then((response) => {
          if(response.status === 200) {
          const html = response.data;
          const $ = cheerio.load(html); 

          let cardsArr = $('.goods_name').text().split(" Graphics Card")
          cardsArr.pop()
          cardsArr = cardsArr.filter(card => alphabet.includes(card.charAt(0)))

          cardsArr.forEach(card => {
            const sql = `
            INSERT INTO graphics_cards(name)
            VALUES($1)
            `
            return db
              .query(sql, [card])
          })
    }});
  }
}

module.exports = gpus