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

            console.log("result", result);
            console.log("result['message']", result.message);

            if (result.message == "We couldn't match any of your foods") {
                return null;
            } else {
                console.log("the result was ")
                console.log(result);
            }


            const foodData = result['foods'][0];
            return {
                name: foodData['food_name'],
                id: `common-${foodData['food_name'].toLowerCase().replace(/ /g, '-')}`,
                serving_size: foodData['serving_weight_grams'],
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