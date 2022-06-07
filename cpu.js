const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./db/db');

  // const args = process.argv.slice(2);
  // const postCode = args[0] || 2000;

function cpuParser(cpu) {
  if (cpu.includes("Intel")){
    return [cpu, "Intel"]
  }
  else if (cpu.includes("AMD")){
    return [cpu, "AMD"]
  }
  else {
    return [null, null]
  }
}

let url = 'https://www.umart.com.au/pc-parts/computer-parts/cpu-processors-611';

axios.get(url)
  .then((response) => {
      if(response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html); 
      let cpuArr = $('.goods_name').text().split(" CPU Processor")
      cpuArr.pop()
      console.log(cpuArr)
      let cpuParsed = cpuArr.map(cpu => cpuParser(cpu))
      cpuParsed.splice(9, 1)//removing bad element
      console.log(cpuParsed)

      cpuParsed.forEach(cpu => {
        const sql = `
        INSERT INTO cpus(name, type)
        VALUES($1, $2)
        `
        return db
          .query(sql, cpu)
      })
}});

