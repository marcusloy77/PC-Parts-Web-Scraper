const cases = require('./models/cases')
const cpus = require('./models/cpus')
const graphics_cards = require('./models/graphics_cards')
const motherboards = require('./models/motherboards')
const psus = require('./models/psus')
const ram = require('./models/ram')
const ssds = require('./models/ssds')
const db = require('./db/db');

main(3)

function main(pages) {
  //simply first create a postgreSQL database named pc_db, profit
  tableCreation()
  cases(pages)
  cpus(pages)
  graphics_cards(pages)
  motherboards(pages)
  psus(pages)
  ram(pages)
  ssds(pages)
}


function tableCreation() {
  const sql = `
  CREATE TABLE cpus(
    id SERIAL PRIMARY KEY,
    name TEXT,
    type TEXT
  );
  CREATE TABLE graphics_cards(
    id SERIAL PRIMARY KEY,
    name TEXT
  );
  CREATE TABLE ram(
    id SERIAL PRIMARY KEY,
    name TEXT,
    type TEXT
  );
  CREATE TABLE motherboards(
    id SERIAL PRIMARY KEY,
    name TEXT,
    ram_type TEXT,
    cpu_type TEXT
  );
  CREATE TABLE ssds(
    id SERIAL PRIMARY KEY,
    name TEXT
  );
  CREATE TABLE psus(
    id SERIAL PRIMARY KEY,
    name TEXT,
    power INTEGER
  );
  CREATE TABLE cases(
    id SERIAL PRIMARY KEY,
    name TEXT
  );
  `
  return db
    .query(sql)
}