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
    return [cpu, null]
  }
}

for (let page =1; page <= 3; page++){
  let url = `https://www.umart.com.au/pc-parts/computer-parts/cpu-processors-611?page=${page}`;

  axios.get(url)
    .then((response) => {
        if(response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html); 
        let cpuArr = $('.goods_name').text().split((/(?=Intel)|(?=AMD)/g))
        cpuArr.pop()
        

        let cpuParsed = cpuArr.filter(cpu => cpu.length < 40)
        cpuParsed = cpuArr.map(cpu => cpuParser(cpu))
        cpuParsed.forEach(cpu => {
          const sql = `
          INSERT INTO cpus(name, type)
          VALUES($1, $2)
          `
          return db
            .query(sql, cpu)
        })
  }});
}
