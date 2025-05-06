import { Food } from "./foodTypes";

export interface Kitchen {
    id: string;
    name: string;
    description?: string;
    foods: Food[];
} 