const puppeteer = require('puppeteer');

(async () => {
	const countries = process.argv.length > 2 ? process.argv.slice(2) : ['Ireland'];

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://www.worldometers.info/coronavirus/#countries');

	const [results, errors] = await page.evaluate(countries => {
		const table = document.querySelector('table#main_table_countries_yesterday');

		const tableHeaders = table.querySelector('thead > tr').children;
		const headers = [...tableHeaders].map(h => h.innerText);

		const rows = table.querySelectorAll('td');
		let bigData = [];
		let noData = [];

		countries.forEach(country => {
			const targetRow = Array.from(rows).find(r => r.innerText.toLowerCase() === `${country}`.toLowerCase());

			if (!targetRow) {
				noData.push(` ${country}`);
				return;
			}

			const dataRows = targetRow.parentElement.children;
			const values = [...dataRows].map(r => r.innerText.trim());

			let dataCountry = {};
			headers.forEach((header, index) => dataCountry[header] = values[index]);
			bigData.push(dataCountry);
		});

		return [bigData, noData];
	}, countries);

	results.sort((a, b) => parseFloat(b.TotalCases) - parseFloat(a.TotalCases));
	console.table(results);

	if (errors.length > 0) {
		console.log(`ERROR: No data for:${errors}!`);
	}

	await browser.close();
})();
