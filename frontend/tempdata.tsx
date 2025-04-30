// import { v4 as uuidv4 } from 'uuid';
import { generateUUID } from '@/lib/utils/uuid';

//types

export type Unit = {
    name: string,
    grams: number
}

export type Portion = {
    unit: Unit,
    quantity: number
}

export type Macros = {
    calories?: number,
    protein?: number,
    carbs?: number,
    fat?: number,
    fiber?: number,
    sodium?: number,
    sugar?: number,
    potassium?: number
}

export type Food = {
    id: string,
    name: string,
    macros: Macros,
}

export type FoodServing = {
    id: string
    food: Food
    portion: Portion,
    servingUnits: Unit[],
}

export type Meal = {
    id: string,
    name: string,
    hour: number,
    foods: FoodServing[],
}

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
export const gram: Unit = {
    name: "g",
    grams: 1
}

export const ounce: Unit = {
    name: "oz",
    grams: 28.35
}

export const cup: Unit = {
    name: "cups",
    grams: 20
}

export const servingUnits: Unit[] = [
    gram, ounce, cup
]

export type MacroPreferences = {
    calories?: Range,
    protein?: Range,
    carbs?: Range,
    fat?: Range,
    fiber?: Range,
    sugar?: Range,
    sodium?: Range,
    potassium?: Range
}

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

export const myMacroPreferences: MacroPreferences = {
    calories: {
        min: 1800,
        max: 2000
    },
    protein: {
        min: 160,
        max: 180
    },
    carbs: {
        min: 225,
        max: 275
    },
    fat: {
        min: 10,
        max: 37,
    },
    fiber: {
        min: 28,
        max: 38,
    },
    sugar: {
        max: 15,
    },
    sodium: {
        max: 2300,
    },
    potassium: {
        min: 5000,
    }
}