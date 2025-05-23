export type UserPreference = {
    id: number;
    user_id: number;
    metric_id: string;
    min_value: number | null;
    max_value: number | null;
    metric: {
        id: string;
        name: string;
        unit: string;
        description: string | null;
    };
};

export type FoodServing = {
    id: string,
    food_id: string,
    portion: number,
    portion_unit: string
}

export type Meal = {
    id: string,
    name: string,
    hour: number,
    servings: FoodServing[]
}
    
export type MacroValue = {
    id: number,
    food_id: string,
    metric_id: string,
    value: number,
    metric: {
        id: string,
        name: string,
        description: string | null,
        unit: string
    }
}

export type dbFood = {
    id: string,
    name: string,
    description: string | null,
    macros: MacroValue[]
}