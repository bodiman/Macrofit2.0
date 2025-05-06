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