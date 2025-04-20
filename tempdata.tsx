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
    id: number,
    name: string,
    macros: Macros,
    portion: Portion,
    servingUnits: Unit[],
}

export type FoodPreview = {
    id: number,
    name: string,
    macros: Macros,
}

export type Meal = {
    id: number,
    name: string,
    hour: number,
    foods: Food[],
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
const gram: Unit = {
    name: "g",
    grams: 1
}

const ounce: Unit = {
    name: "oz",
    grams: 28.35
}

const cup: Unit = {
    name: "cups",
    grams: 20
}

const servingUnits: Unit[] = [
    gram, ounce, cup
]

// Foods

const bacon: Food = {
    id: 0,
    name: "bacon",
    macros: {
        calories: 5,
        protein: 0.37,
        carbs: 0.01,
        fat: 0.42,
        fiber: 0,
    },
    portion: {
        unit: gram,
        quantity: 10
    },
    servingUnits: servingUnits
} 

const hotdog: Food = {
    id: 0,
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
    servingUnits: servingUnits,
    portion: {
        unit: gram,
        quantity: 10
    }
}

const burrito: Food = {
    id: 1,
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
    servingUnits: servingUnits,
    portion: {
        unit: ounce,
        quantity: 5
    }
}

const sandwich: Food = {
    id: 2,
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
    servingUnits: servingUnits,
    portion: {
        unit: ounce,
        quantity: 8
    }
}

const fried: Food = {
    id: 2,
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
    servingUnits: servingUnits,
    portion: {
        unit: ounce,
        quantity: 8
    }
}


// meals

export const meals = [
    {
        id: 0,
        name: "Breakfast",
        hour: 8,
        foods: [bacon, bacon],
    },
    {
        id: 1,
        name: "Lunch",
        hour: 13,
        foods: [bacon, hotdog, bacon, hotdog, bacon],
    },
    {
        id: 2,
        name: "Dinner",
        hour: 18,
        foods: [burrito, sandwich, fried, bacon, burrito,],
    }
]

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

export const myMacroPreferences = {
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
        max: 15
    },
    fiber: {
        max: 15
    },
    sugar: {
        max: 15
    },
    sodium: {
        max: 15
    },
    potassium: {
        min: 5000,
    }
}