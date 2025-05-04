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