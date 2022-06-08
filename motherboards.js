const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./db/db');


  // const args = process.argv.slice(2);
  // const postCode = args[0] || 2000;



function motherboardParser(motherboard) {
  let motherboardOutput = [motherboard, "Null", "Null"]
  if (motherboard.includes("DDR4")){
    motherboardOutput[1] = "DDR4"
  }
  else if (motherboard.includes("DDR3")){
    motherboardOutput[1] = "DDR3"
  }
  else if (motherboard.includes("DDR5")){
    motherboardOutput[1] = "DDR5"
  }
  if (motherboard.includes("LGA")){
    motherboardOutput[2] = "Intel"
  }
  else if (motherboard.includes("AM4")){
    motherboardOutput[2] = "AMD"
  }
  return motherboardOutput
}

let url = 'https://www.umart.com.au/pc-parts/computer-parts/motherboards-104';
cardsArr = axios.get(url)
  .then((response) => {
      if(response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html); 
      
      let motherboardArr = $('.goods_name').text().split(/Motherboard|Module/)
      motherboardArr.pop()
      
      

      motherboardArr = motherboardArr.map(motherboard =>  motherboardParser(motherboard))
      console.log(motherboardArr)

      motherboardArr.forEach(card => {
        const sql = `
        INSERT INTO motherboards(name, ram_type, cpu_type)
        VALUES($1, $2, $3)
        `
        return db
          .query(sql, card)
      })
}});


//to get ram specifications - scrape link, go to each link, search for 'ddr' and output the number directly after it