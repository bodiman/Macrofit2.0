import { v4 as uuidv4 } from 'uuid';

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

// Foods

export const bacon: Food = {
    id: uuidv4(),
    name: "bacon",
    macros: {
        calories: 5,
        protein: 0.37,
        carbs: 0.01,
        fat: 0.42,
        fiber: 0,
    },
    // portion: {
    //     unit: gram,
    //     quantity: 10
    // },
    // servingUnits: servingUnits
} 

export const hotdog: Food = {
    id: uuidv4(),
    name: "hotdog",
    macros: {
        calories: 5,
        protein: 0.37,
        carbs: 0.01,
        fat: 0.42,
        fiber: 0,
        sugar: 0.1,
        sodium: 10,
        potassium: 2,
    },
    // servingUnits: servingUnits,
    // portion: {
    //     unit: gram,
    //     quantity: 10
    // }
}

export const burrito: Food = {
    id: uuidv4(),
    name: "burrito",
    macros: {
        calories: 100,
        protein: 0.237,
        carbs: 0.41,
        fat: 0.2,
        fiber: 2,
        sugar: 1,
        sodium: 100,
        potassium: 2,
    },
    // servingUnits: servingUnits,
    // portion: {
    //     unit: ounce,
    //     quantity: 5
    // }
}

export const sandwich: Food = {
    id: "",
    name: "sandwich",
    macros: {
        calories: 40,
        protein: 0.37,
        carbs: 1,
        fat: 0.1,
        fiber: 1,
        sugar: 2,
        sodium: 32,
        potassium: 200,
    },
    // servingUnits: servingUnits,
    // portion: {
    //     unit: ounce,
    //     quantity: 8
    // }
}

export const fried: Food = {
    id: "",
    name: "fried chicken with gravy and tartar sauce",
    macros: {
        calories: 200,
        protein: 0.0,
        carbs: 0,
        fat: 22,
        fiber: 0,
        sugar: 0,
        sodium: 500,
        potassium: 20,
    },
    // servingUnits: servingUnits,
    // portion: {
    //     unit: ounce,
    //     quantity: 8
    // }
}

// temporary for testing
export function createInstance(food: Food) {
    const instance: FoodServing = {
        id: uuidv4(),
        food: {...food},
        portion: {
            unit: gram,
            quantity: 10
        },
        servingUnits: servingUnits
    }
    return instance
}


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

export const foodDataBase = {
    sandwich: sandwich,
    hotdog: hotdog,
    burrito: burrito,
    fried: fried
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