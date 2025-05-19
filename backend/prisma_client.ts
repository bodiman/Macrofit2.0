// need to import FoodMacro with metrics included
import { PrismaClient, FoodMacro, Prisma, Food, ServingUnit, Meal, FoodServing } from './generated/prisma';


const prisma = new PrismaClient()

export default prisma; 

// export type { Food as FoodTable };
export type DbMacros = FoodMacro & {
  metric: Prisma.NutritionalMetricGetPayload<{}>;
};

export type DbFood = Food & {
  macros: DbMacros[];
  servingUnits: ServingUnit[];
};

export type DbMeal = Meal & {
  servings: DbFoodServing[];
};

export type DbFoodServing = FoodServing & {
  food: DbFood;
  unit: ServingUnit;
};