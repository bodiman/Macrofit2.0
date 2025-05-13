import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import Papa from 'papaparse';

const CALDINING_MACRONUTRIENT_NAME_MAP: Record<string, string> = {
    'Calories (kcal):': 'calories',
    'Total Lipid/Fat (g):': 'total_fat',
    'Saturated fatty acid (g):': 'saturated_fat',
    'Trans Fat (g):': 'trans_fat',
    'Cholesterol (mg):': 'cholesterol',
    'Sodium (mg):': 'sodium',
    'Carbohydrate (g):': 'carbohydrates',
    'Total Dietary Fiber (g):': 'fiber',
    'Sugar (g):': 'sugar',
    'Protein (g):': 'protein',
    'Vitamin A (iu):': 'vitamin_a',
    'Vitamin C (mg):': 'vitamin_c',
    'Calcium (mg):': 'calcium',
    'Iron (mg):': 'iron',
    'Water (g):': 'water',
    'Potassium (mg):': 'potassium',
    'Vitamin D(iu):': 'vitamin_d'
  };


export async function retrieveDiningConfigs(): Promise<Record<string, any>> {
  const response = await axios.get('https://dining.berkeley.edu/menus/');
  const $ = cheerio.load(response.data);
  const configs: Record<string, any> = {};

  const allLocations = $('ul.cafe-location');

  allLocations.each((_, locationTag) => {
    $(locationTag).children().each((_, tag) => {
      const diningHallName = $(tag).find('span.cafe-title').text().trim();
      const meals = $(tag).find('ul.meal-period');

      configs[diningHallName] = {};

      meals.children().each((_, mealTag) => {
        const $mealTag = $(mealTag);
        const mealName = $mealTag.attr('class')?.split(' ').pop();
        const recipes = $mealTag.find('li');

        configs[diningHallName][mealName!] = {};

        recipes.each((_, recipe) => {
          const recipeName = $(recipe).children().first().text().trim();
          configs[diningHallName][mealName!][recipeName] = {
            action: 'get_recipe_details',
            menu_id: $(recipe).attr('data-menuid'),
            id: $(recipe).attr('data-id'),
            location: $(recipe).attr('data-location'),
          };
        });
      });
    });
  });

  return configs;
}


export async function retrieveNutrientInfo(payload: Record<string, string>): Promise<Record<string, any>> {
    const response = await axios.post(
      'https://dining.berkeley.edu/wp-admin/admin-ajax.php',
      new URLSearchParams(payload),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  
    const $ = cheerio.load(response.data);
  
    // Parse serving size
    const servingSizeRaw = $('span.serving-size').first().text();
    const servingSize = servingSizeRaw.slice(14).trim(); // Remove "Serving Size: "
  
    const nutrientInfo: Record<string, any> = {
      serving_size: servingSize,
    };
  
    // Find all <li> elements under the .nutration-details section
    $('div.nutration-details li').each((_, el) => {
      const span = $(el).find('span').first();
      const label = span.text().trim();
      const value = $(el).contents().filter((i, node) => node.type === 'text').text().trim();
  
      if (CALDINING_MACRONUTRIENT_NAME_MAP.hasOwnProperty(label)) {
        nutrientInfo[CALDINING_MACRONUTRIENT_NAME_MAP[label]] = value;
      }
    });
  
    return nutrientInfo;
  }

  
export function splitServingSize(servingSize: string): [number, string] {
    const [size, unit] = servingSize.split(' ');
    return [parseFloat(size), unit];
}
  

export function buildRawNutrientTable(nutrientInfo: Record<string, any>[], columns: string[]): Record<string, any[]> {
    const foodDict: Record<string, any[]> = {};
    const allColumns = [...columns, 'serving_unit'];
  
    allColumns.forEach(column => {
      foodDict[column] = [];
    });
  
    nutrientInfo.forEach(nutrientDict => {
      const [size, unit] = splitServingSize(nutrientDict.serving_size);
      nutrientDict.serving_size = size;
      nutrientDict.serving_unit = unit;
  
      allColumns.forEach(column => {
        foodDict[column].push(nutrientDict[column]);
      });
    });
  
    return foodDict;
}

export function standardizeRawNutrientTable(rawTable: Record<string, any[]>): Record<string, any[]> {
    const standardizedTable: Record<string, any[]> = {};
  
    Object.keys(rawTable).forEach(column => {
      if (
        column === 'serving_unit' ||
        column === 'name' ||
        column === 'kitchen' ||
        column === 'meal'
      ) {

        // Remove quotes from the string
        standardizedTable[column] = rawTable[column].map((entry: string) =>
          String(entry).replace(/['"]/g, '')
        );

      } else {
        standardizedTable[column] = rawTable[column].map((value: number, index: number) => {
          return value / rawTable['serving_size'][index];
        });
      }
    });
  
    return standardizedTable;
}


export async function retrieveDiningHallNutritionInfo(payloads: Record<string, any>, columns: string[]): Promise<Record<string, any[]>> {
    if (!columns.includes('serving_size')) {
      columns.push('serving_size');
    }
  
    const foodNames: string[] = [];
    const kitchenNames: string[] = [];
    const mealNames: string[] = [];
    const nutrientInfoPromises: Promise<Record<string, any>>[] = [];
  
    // Collect all promises
    for (const kitchen in payloads) {
      for (const meal in payloads[kitchen]) {
        for (const food in payloads[kitchen][meal]) {
          console.log(`Queueing request for ${kitchen}, ${meal}, ${food}`);
          const payload = payloads[kitchen][meal][food];
          
          // // Store the promise and track the associated metadata
          // const promise = retrieveNutrientInfo(payload).then(info => {
          //   foodNames.push(food);
          //   mealNames.push(meal);
          //   kitchenNames.push(kitchen);
          //   return info;
          // });
          
          // nutrientInfoPromises.push(promise);
          const i = nutrientInfoPromises.length;

          foodNames[i] = food;
          mealNames[i] = meal;
          kitchenNames[i] = kitchen;

          const promise = retrieveNutrientInfo(payload).then(info => info);
          nutrientInfoPromises.push(promise);
        }
      }
    }
  
    // Execute all requests in parallel
    console.log(`Executing ${nutrientInfoPromises.length} requests in parallel...`);
    const nutrientInfo = await Promise.all(nutrientInfoPromises);
  
    const rawNutrientTable = buildRawNutrientTable(nutrientInfo, columns);
  
    rawNutrientTable['name'] = foodNames;
    rawNutrientTable['kitchen'] = kitchenNames;
    rawNutrientTable['meal'] = mealNames;
  
    return rawNutrientTable;
}  


export async function retrieveDiningHallNutritionInfoSync(payloads: Record<string, any>, columns: string[]): Promise<Record<string, any[]>> {
  if (!columns.includes('serving_size')) {
    columns.push('serving_size');
  }

  const foodNames: string[] = [];
  const kitchenNames: string[] = [];
  const mealNames: string[] = [];
  const nutrientInfo: Record<string, any>[] = [];

  let i = 0;
  for (const kitchen in payloads) {
    for (const meal in payloads[kitchen]) {
      for (const food in payloads[kitchen][meal]) {
        console.log(`Requesting (sequential) for ${kitchen}, ${meal}, ${food}`);
        const payload = payloads[kitchen][meal][food];

        foodNames[i] = food;
        mealNames[i] = meal;
        kitchenNames[i] = kitchen;

        // Await each request one at a time
        const info = await retrieveNutrientInfo(payload);
        nutrientInfo.push(info);

        i++;
      }
    }
  }

  const rawNutrientTable = buildRawNutrientTable(nutrientInfo, columns);

  rawNutrientTable['name'] = foodNames;
  rawNutrientTable['kitchen'] = kitchenNames;
  rawNutrientTable['meal'] = mealNames;

  return rawNutrientTable;
}
  

(async () => {  
    let payloads = await retrieveDiningConfigs();
  
    // const rawNutrientTable = await retrieveDiningHallNutritionInfo(payloads, Object.values(CALDINING_MACRONUTRIENT_NAME_MAP));
    const rawNutrientTable = await retrieveDiningHallNutritionInfoSync(payloads, Object.values(CALDINING_MACRONUTRIENT_NAME_MAP));
    const standardizedNutrientTable = standardizeRawNutrientTable(rawNutrientTable);
    fs.writeFileSync('nutrient_table.json', JSON.stringify(standardizedNutrientTable, null, 2));
    
    // use cached nutrient table
    // const standardizedNutrientTable = JSON.parse(fs.readFileSync('nutrient_table.json', 'utf8'));
    

    // Convert it to a row-wise array of objects
    const keys = Object.keys(standardizedNutrientTable);
    const numRows = standardizedNutrientTable[keys[0]].length;

    const rows = Array.from({ length: numRows }, (_, i) =>
      Object.fromEntries(keys.map((key) => [key, standardizedNutrientTable[key][i]]))
    );

    // console.log(rows);

    // Convert to CSV with NO quotes
    const csv = Papa.unparse(rows, {
      quotes: false,
      quoteChar: '',      // no quote character
      escapeChar: '',     // disable escaping
      delimiter: ',',     // use comma
      header: true,       // include headers
    });
    // Save to file
    fs.writeFileSync('scraped_menu.csv', csv);
})();
  
