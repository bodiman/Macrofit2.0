import { NUTRITIONIX_APP_ID, NUTRITIONIX_APP_KEY } from '../../config/env';
import nutrient_map from './nutritionix_nutrient_map';
const headers = {
    'x-app-id': NUTRITIONIX_APP_ID ?? '',
    'x-app-key': NUTRITIONIX_APP_KEY ?? '',
    'Content-Type': "application/json"
}

function getUniqueFoods(commonFoods: any[]) {
    // get first 5 foods with unique tag ids
    const tagIds: number[] = [];
    const uniqueFoods: any[] = [];
    let i = 0;

    for (const food of commonFoods) {
        if (!tagIds.includes(food.tag_id)) {
            tagIds.push(food.tag_id);
            uniqueFoods.push(food);
            i++;
        }

        if (i === 5) {
            break;
        }
    }

    return uniqueFoods;
}

async function getNutritionixCommonNames(query: string) {    
    const response = await fetch(`https://trackapi.nutritionix.com/v2/search/instant/?query=${query}`, {
        headers: headers,
    });
    const data = await response.json();
    const commonFoods = data['common'];
    const uniqueFoods = getUniqueFoods(commonFoods);

    return uniqueFoods.map((food: any) => food.food_name).slice(0, 5);
}

async function getNutritionixData(query: string) {
    const commonFoods = await getNutritionixCommonNames(query);

    // asynchronously gather data for each common food
    const data = await Promise.all(
        commonFoods.map(async (food: string) => {
            const response = await fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
                method: "POST",
                headers,
                body: JSON.stringify({ query: food }),
            });

            const result = await response.json()
            const foodData = result['foods'][0];
            return {
                name: foodData['food_name'],
                serving_size: foodData['serving_weight_grams'],
                macros: foodData['full_nutrients']
            }
        })
    );

    const formattedData = {
        ...data[0],
        macros: data[0].macros.map((macro: any) => {
            return {
                name: nutrient_map[macro.attr_id],
                value: macro.value / data[0].serving_size,
            }
        })
    }

    return formattedData; // array of nutrition data for each food
}



async function main() {
    const data = await getNutritionixData("apple");
    
    console.log(data);

}

main();