const axios = require('axios');
const cheerio = require('cheerio');

  // const args = process.argv.slice(2);
  // const postCode = args[0] || 2000;
let url = 'https://www.umart.com.au/pc-parts/computer-parts/cpu-processors-611';
axios.get(url)
  .then((response) => {
      if(response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html); 
      let cpuArr = $('.goods_name').text().split(" CPU Processor")
      cpuArr.pop()
      console.log(cpuArr)
      const cpuParsed = cpuArr.map(cpu => cpuParser(cpu))
      console.log(cpuParsed)
}});

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