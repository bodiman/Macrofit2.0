import { foodDataBase } from "@/tempdata"

type query = {
    name: string
}

export default function getFoods(query: query) {
    return Object.values(foodDataBase);
}