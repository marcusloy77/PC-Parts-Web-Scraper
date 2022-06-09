CREATE DATABASE pc_db;
\c pc_db

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
