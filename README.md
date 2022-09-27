<h1> Pc-Parts-Web-Scraper </h1>

Web scraper/ PSQL database populator to support the <a href="https://github.com/marcusloy77/PC-Builder">PC Build Webapp Project </a>. It utilizes a popular website for buying pc parts to source the most popular parts as well as links to said parts, then populates a database using postgreSQL and string parsing. Simply run the main.js in node with a postGreSQL database named 'pc_db' created first and it will completely populate the database with information about a number of different pc parts. Can extend as much as you like in terms of pages scraped.
One future feature I'd like to implement in the future is both checking for duplicates, and further enhancing the information derived from the scrape. Right now its mostly names and compatibility features, but being able to sort by cores, memory etc would be helpful.
