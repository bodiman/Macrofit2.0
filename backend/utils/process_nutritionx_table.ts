import Papa from 'papaparse';
import fs from 'fs';

interface FoodRecord {
    attr_id: string;
    "2018 NFP": string;
    usda_tag: string;
    name: string;
    unit: string;
}

const fileContent = fs.readFileSync('nutritionix_attribute_table.csv', 'utf8');

const result = Papa.parse<FoodRecord>(fileContent, {
    header: true,           // Use first row as keys
    skipEmptyLines: true,   // Skip empty lines
    dynamicTyping: true     // Convert strings to numbers/booleans when possible
});

// take the names, remove any text after commas
const names = result.data.map((row) => row.name.split(',')[0]);

// udate the names and write the new data to updated_nutritionix_attribute_table.csv
const updatedData = result.data.map((row, index) => ({
    ...row,
    id: names[index]
}));

fs.writeFileSync('updated_nutritionix_attribute_table.csv', Papa.unparse(updatedData));
