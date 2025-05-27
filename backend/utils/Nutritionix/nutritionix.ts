import { NUTRITIONIX_APP_ID, NUTRITIONIX_APP_KEY } from '../../config/env';
import nutrient_map from './nutritionix_nutrient_map';
const headers = {
    'x-app-id': NUTRITIONIX_APP_ID ?? '',
    'x-app-key': NUTRITIONIX_APP_KEY ?? '',
    'Content-Type': "application/json"
}

type CommonFood = {
    tag_id: number;

}

function getUniqueFoods(commonFoods: CommonFood[]) {
    if (commonFoods === undefined) {
        return [];
    }

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

export async function getNutritionixCommonNames(query: string) {    
    const response = await fetch(`https://trackapi.nutritionix.com/v2/search/instant/?query=${query}`, {
        headers: headers,
    });
    const data = await response.json();
    const commonFoods = data['common'];
    const uniqueFoods = getUniqueFoods(commonFoods);



    return uniqueFoods.map((food: any) => food.food_name);
}

export async function getNutritionixData(commonFoods: string[]) {
    // asynchronously gather data for each common food
    const data = await Promise.all(
        commonFoods.map(async (food: string) => {
            const response = await fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
                method: "POST",
                headers,
                body: JSON.stringify({ query: food }),
            });

            const result = await response.json()


            // console.log("result['message']", result.message);

            if (result.message == "We couldn't match any of your foods") {
                return null;
            } else {
                // console.log("result", result['foods']);
                // result['foods'].forEach((food: any) => {
                //     console.log("food", food.alt_measures);
                // });
            }


            const foodData = result['foods'][0];

            console.log("foodData", foodData);

            const serving_units = foodData['alt_measures'].map((unit: any) => {
                return {
                    name: unit.measure,
                    grams: unit.serving_weight / unit.qty
                }
            });
            // console.log("foodData", foodData.alt_measures);
            // console.log("serving_units", serving_units);
            
            return {
                name: foodData['food_name'],
                serving_size: foodData['serving_weight_grams'],
                serving_units: serving_units,
                macros: foodData['full_nutrients']
            }
        })
    );

    return data.map((food: any) => {
        if (!food) {
            return null;
        }
        
        return {
            ...food,
            macros: food.macros.map((macro: any) => {
                return {
                    metric_id: nutrient_map[macro.attr_id],
                    value: macro.value / food.serving_size,
                }
            })
        }
    });
}