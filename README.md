# Node and Puppeteer Web Scraper
Uses Node.js and Puppeteer to scrape and display stats about the current epidemic for requested countries.

### Setup
Install Node packages with:
```
npm install
```
### Usage
```
node scraper <country> <country> <country>
```
It will accept a list of countries as arguments (or default to `Ireland` if no country is provided), scrape the stats of [Worldometers.info](https://www.worldometers.info/coronavirus/#countries) and display them in the terminal in a table format.

### Note:
This script was made to make it easier for me to get the information I want and learn something new in the process (task automation and web scraping with Node and Puppeteer), not to generate 'clicks' by jumping on this popular yet difficult topic. 
### Packages
```
"puppeteer": "^2.1.1"
```