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
        foods: [bacon, bacon, bacon],
    },
    {
        id: 2,
        name: "Dinner",
        hour: 18,
        foods: [bacon],
    }
]