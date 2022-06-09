const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./db/db');


  // const args = process.argv.slice(2);
  // const postCode = args[0] || 2000;

function psuParser(psu){
  
  if (psu === undefined){
    return false
  }
  if (psu[0] === ' ' || psu[0] === '-'){
    return false
  }
  if (psu.length < 21){
    return false
  }
  return true
}

function psuPowerParser(psu) {
  let output = [psu, null]
  let psuSplit = psu.split(" ")
  //console.log(psuSplit)
  let check = ""
  psuSplit.forEach(str => {
    //console.log(str)
    if (str.includes("W") || str.includes("w")){
    check = str.replace('w', '')
    check = check.replace('W', '')
    //console.log(parseInt(check))

    if (parseInt(check)){
      output[1] = parseInt(check)
      //would usually use break here but its a function sooooo
    }}
  })
  //console.log(output)
  return output
}

for (let page =1; page <= 3; page++){
  let url = `https://www.umart.com.au/pc-parts/computer-parts/power-supply-psu-140?page=${page}`;
  axios.get(url)
    .then((response) => {
        if(response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html); 

        let psuArr = $('.goods_name').text().split(/([()])| Power Supply/)
        //console.log(psuArr[5], psuArr[9], psuArr[10])
        //psuArr.splice(5, 1)//removing bad element
        psuArr.pop()
        
        psuArr = psuArr.filter(psu => psuParser(psu))
        //console.log(psuArr)

        psuArr = psuArr.map(psu => psuPowerParser(psu))
        console.log(psuArr)

        psuArr.forEach(psu => {
          const sql = `
          INSERT INTO psus(name, power)
          VALUES($1, $2)
          `
          return db
            .query(sql, psu)
        })
  }});
}