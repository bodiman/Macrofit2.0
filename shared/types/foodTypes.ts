import { Macros } from './macroTypes';


export type Food = {
    id: string;
    name: string;
    macros: Macros;
};

export type FoodServing = {
    id: string
    food: Food
    portion: Portion,
    servingUnits: Unit[],
}

export type Unit = {
    name: string,
    grams: number
}

export type Portion = {
    unit: Unit,
    quantity: number
}