const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./db/db');


  // const args = process.argv.slice(2);
  // const postCode = args[0] || 2000;

for (let page =1; page <= 3; page++){
  let url = `https://www.umart.com.au/pc-parts/computer-parts/cases-139?page=${page}`;
  axios.get(url)
    .then((response) => {
        if(response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html); 

        let casesArr = $('.goods_name').text().split((/(?=Corsair)|(?=CORSAIR)|(?=Deepcool)|(?=Fractal)|(?=Thermaltake)|(?=NZXT)|(?=MSI)|(?=AZZA)|(?=Lian)(?=Silver)|(?=Cooler Master)/g))
        //casesArr[' - '] = ""


        casesArr = casesArr.filter(caseP => caseP.length < 90)

        console.log(casesArr)

        casesArr.forEach(pcCase => {
          const sql = `
          INSERT INTO cases(name)
          VALUES($1)
          `
          return db
            .query(sql, [pcCase])
        })
  }});
}