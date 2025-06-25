import { Food, FoodServing, Meal } from "../shared/types/foodTypes";
import { Macros } from "../shared/types/macroTypes";

import { DbFood, DbFoodServing, DbMacros, DbMeal } from "./prisma_client";

export function toMacros(macros: DbMacros[]): Macros {
    const macroMap: Macros = {};
    macros.forEach((macro) => {
        macroMap[macro.metric.id] = macro.value;
    });
    return macroMap;
}

export function toFoods(dbFoods: DbFood[]): Food[] {
    return dbFoods.map((dbFood) => ({
        id: dbFood.id,
        name: dbFood.name,
        brand: dbFood.brand,
        macros: toMacros(dbFood.macros),
        servingUnits: dbFood.servingUnits
    }));
}

export function toFoodServings(dbFoodServings: DbFoodServing[]): FoodServing[] {
    return dbFoodServings.map((dbFoodServing) => ({
        id: dbFoodServing.id,
        food: toFoods([dbFoodServing.food])[0],
        quantity: dbFoodServing.quantity,
        unit: dbFoodServing.unit
    }));
}
export function toMeals(dbMeals: DbMeal[]): Meal[] {
    return dbMeals.map((dbMeal) => ({
        id: dbMeal.id,
        name: dbMeal.name,
        date: dbMeal.date,
        // get time with day=0, month=0, year=0
        // time: new Date(dbMeal.time, day=0, month=0, year=0),
        time: new Date(dbMeal.time),
        servings: toFoodServings(dbMeal.servings)
    }));
}