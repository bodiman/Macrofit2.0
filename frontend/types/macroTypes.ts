export type UserPreference = {
    id: number;
    user_id: number;
    metric_id: number;
    min_value: number | null;
    max_value: number | null;
    metric: {
        id: number;
        name: string;
        unit: string;
        description: string | null;
    };
};

export type Macros = Map<string, number>;

export type MacroPreference = {
    id: string,
    name: string,
    unit: string,
    min?: number,
    max?: number
}

export type MacroPreferences = Array<MacroPreference>

export type Food = {
    id: number,
    name: string,
    macros: Macros,
}