// import { v4 as uuidv4 } from 'uuid';
import { generateUUID } from '@/lib/utils/uuid';
import { Food, FoodServing } from '@shared/types/foodTypes';

//types

export type ServingUnit = {
    name: string,
    grams: number
}

// export type Macros = {
//     calories?: number,
//     protein?: number,
//     carbs?: number,
//     fat?: number,
//     fiber?: number,
//     sodium?: number,
//     sugar?: number,
//     potassium?: number
// }

export type Range = {
    min?: number,
    max?: number
}

export type MacroKey = keyof typeof myMacroPreferences;

export const unitMap = {
    calories: "",
    protein: "g",
    carbs: "g",
    fat: "g",
    fiber: "g",
    sugar: "g",
    sodium: "mg",
    potassium: "mg"
}

// Units
export const gram: ServingUnit = {
    name: "g",
    grams: 1
}

export const ounce: ServingUnit = {
    name: "oz",
    grams: 28.35
}

export const cup: ServingUnit = {
    name: "cups",
    grams: 20
}

export const servingUnits: ServingUnit[] = [
    gram, ounce, cup
]



// // temporary for testing
// export async function createInstance(food: Food) {
//     const instance: FoodServing = {
//         id: await generateUUID(),
//         food: {...food},
//         portion: {
//             unit: gram,
//             quantity: 10
//         },
//         servingUnits: servingUnits
//     }
//     return instance
// }


// meals

export const myMacros = {
    calories: 864,
    protein: 120,
    carbs: 127,
    fat: 27,
    fiber: 15.6,
    sugar: 5,
    sodium: 10,
    potassium: 2000,
}

// Macro preferences

export type Macros = Record<string, number>

export type MacroPreference = {
    id: string,
    name: string,
    unit: string,
    min?: number,
    max?: number
}

export type MacroPreferences = Array<MacroPreference>

export const myMacroPreferences: MacroPreferences = [
    {id: 'calories', name: 'Calories', unit: '', min: 1800, max: 2000},
    {id: 'protein', name: 'Protein', unit: 'g', min: 160, max: 180},
    {id: 'carbohydrates', name: 'Carbs', unit: 'g', min: 225, max: 275},
    {id: 'fat', name: 'Fat', unit: 'g', min: 10, max: 37},
    {id: 'fiber', name: 'Fiber', unit: 'g', min: 28, max: 38},
    {id: 'sugar', name: 'Sugar', unit: 'g', max: 15},
]