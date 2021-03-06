/*eslint-disable*/
var fs=require('fs');
module.exports = function convert(startYear)
{
  if(typeof startYear=='string')
  {
    return "";
  }
  else if(typeof startYear !== 'number' || isNaN(startYear))
  {
       throw new Error('Not a number');
  }

var ln = require('readline').createInterface({
 input: fs.createReadStream('FoodFacts.csv')
});

var country = ['Netherlands', 'Canada', 'United Kingdom' , 'United States' , 'Australia' , 'France' , 'Germany' , 'Spain', 'South Africa'];
var data=[],final_c=[];
var sugarindex=0,saltindex=0,countryindex=0,countryv = 0,sugar = 0,salt = 0,i=0;

var sugarv = Array(9).fill(0);
var saltv = Array(9).fill(0);

ln.on('line', function (line) {
data=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

while(i<1)
 {
   countryindex=data.indexOf('countries_en');
   sugarindex=data.indexOf('sugars_100g');
   saltindex=data.indexOf('salt_100g');
   i++;
 }

countryv=data[countryindex];
//console.log(countryv);
sugar=data[sugarindex];
salt=data[saltindex];
  if(salt=="") salt=0;
    if(sugar=="") sugar=0;

var index=country.indexOf(countryv);
//console.log(index);
    if(index!=-1)
    {
     sugarv[index]+=parseFloat(sugar);
     saltv[index]+=parseFloat(salt);
   }
});

ln.on('close', function() {
 for(var h=0;h<country.length;h++) {
   final_c.push({Country:country[h],
   Sugar:sugarv[h],
   Salt:saltv[h]
 });
 
}    

console.log(final_c);
fs.writeFile('output_food.json', JSON.stringify(final_c));    

});

return 'JSON written successfully';
};