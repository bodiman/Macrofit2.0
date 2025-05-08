import nutrient_table from "./nutritionix_table";

// console.log(nutrient_table);

// // make a map from the attr_id to nutrient id
const nutrient_map = nutrient_table.reduce((acc: any, nutrient: any) => {
    acc[parseInt(nutrient.attr_id)] = nutrient.id;
    return acc;
}, {});

export default nutrient_map as Record<number, string>;