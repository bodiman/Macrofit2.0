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
}

export type Food = {
    id: number,
    name: string,
    macros: Macros,
    portion: Portion
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

export type MacroKey = keyof typeof myMacroPreferences;

const gram: Unit = {
    name: "grams",
    grams: 1
}

const portion: Portion = {
    unit: gram,
    quantity: 10
}

const bacon: Food = {
    id: 0,
    name: "Bacon",
    macros: {
        calories: 5,
        protein: 0.37,
        carbs: 0.01,
        fat: 0.42,
        fiber: 0,
    },
    portion: portion
} 


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
        foods: [bacon, bacon, bacon, bacon, bacon],
    },
    {
        id: 2,
        name: "Dinner",
        hour: 18,
        foods: [bacon, bacon, bacon, bacon, bacon, bacon,],
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

const foodDataBase = {
    hotdog: {
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
    },
    burrito: {
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
    },
    sandwich: {
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
    }
}

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