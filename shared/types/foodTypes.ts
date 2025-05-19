import { Macros } from './macroTypes';


export type Food = {
    id: string;
    name: string;
    macros: Macros;
    servingUnits: ServingUnit[]
};

export type FoodServing = {
    id: string
    food: Food
    quantity: number,
    unit: ServingUnit,
}

export type ServingUnit = {
    id: string,
    food_id: string,
    name: string,
    grams: number
}

export type Meal = {
    id: string,
    name: string,
    date: Date,
    time: Date,
    servings: FoodServing[],
}
// id: string; name: string; food_id: string; grams: number;