import fs from 'fs';
import Papa from 'papaparse';
import path from 'path';

const csvPath = path.resolve(__dirname, '../Nutritionix/nutritionix_attribute_table.csv');

const fileContent = fs.readFileSync(csvPath, 'utf8');
// console.log(fileContent);

const result = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true
});

export default result.data;
