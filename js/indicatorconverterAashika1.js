const readLine = require('readline');
const read = require('fs');
module.exports = function(convert) {
	if(!convert) {
		throw Error('Not a number');
	}
	if(typeof convert !== 'number') {
		throw Error('Not a number');
   }


let lineReader = readLine.createInterface({
		input: read.createReadStream('../inputdata/Indicators.csv'),
		output: process.stdout,
		terminal: false
	});
	let jsonArray = [];
	let heading = [];
	let rows = 0;
	let count = 0;
	lineReader.on('line', function (line) {
		if(rows === 0) {
			heading = line.split(',');
			rows = rows + 1;
		}
		else {
			let jsonObj = {};
			let currentLineData = line.split(',');
			for (let j = 0; j < heading.length; j = j + 1) {
				if(heading[j] === 'Year') {
					if(currentLineData[j - 3] === 'IND'
						&& (currentLineData[j - 1] === 'SP.URB.TOTL.IN.ZS'
						|| currentLineData[j - 1] === 'SP.RUR.TOTL.ZS')) {
						jsonObj[heading[j]] = currentLineData[j];
						count = 1;
					}
					else {
						count = 0;
					}
				}
				if(heading[j] === 'Value') {
					if(currentLineData[j - 4] === 'IND'
						&& (currentLineData[j - 2] === 'SP.URB.TOTL.IN.ZS'
						|| currentLineData[j - 2] === 'SP.RUR.TOTL.ZS')) {
						jsonObj[heading[j]] = currentLineData[j];
						count = 1;
					}
					else {
						count = 0;
					}
				}
			}
			if(count === 1) {
				jsonArray.push(jsonObj);
			}
		}
	});
	lineReader.on('close', function() {
		read.writeFile('linechart.json', JSON.stringify(jsonArray));
	});
	return 'JSON written successfully';
};
