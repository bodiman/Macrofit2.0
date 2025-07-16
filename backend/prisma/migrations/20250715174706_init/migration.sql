-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Kitchen" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Kitchen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "brand" TEXT NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodMacro" (
    "id" SERIAL NOT NULL,
    "food_id" TEXT NOT NULL,
    "metric_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FoodMacro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionalMetric" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "NutritionalMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "metric_id" TEXT NOT NULL,
    "min_value" DOUBLE PRECISION,
    "max_value" DOUBLE PRECISION,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodServing" (
    "id" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,
    "meal_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit_id" TEXT NOT NULL,
    "mealPlanId" TEXT,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "minQuantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "maxQuantity" DOUBLE PRECISION NOT NULL DEFAULT 3,

    CONSTRAINT "FoodServing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "user_id" INTEGER NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPlan" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "meal_id" TEXT NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "MealPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServingUnit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grams" DOUBLE PRECISION NOT NULL,
    "food_id" TEXT NOT NULL,

    CONSTRAINT "ServingUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMealPreference" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "default_time" TEXT NOT NULL,
    "distribution_percentage" DOUBLE PRECISION,

    CONSTRAINT "UserMealPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealMacroGoal" (
    "id" TEXT NOT NULL,
    "user_meal_preference_id" TEXT NOT NULL,
    "metric_id" TEXT NOT NULL,
    "target_percentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MealMacroGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KitchenFood" (
    "id" TEXT NOT NULL,
    "kitchen_id" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "KitchenFood_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Kitchen_name_key" ON "Kitchen"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Food_name_brand_key" ON "Food"("name", "brand");

-- CreateIndex
CREATE UNIQUE INDEX "FoodMacro_food_id_metric_id_key" ON "FoodMacro"("food_id", "metric_id");

-- CreateIndex
CREATE UNIQUE INDEX "NutritionalMetric_name_key" ON "NutritionalMetric"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_user_id_metric_id_key" ON "UserPreference"("user_id", "metric_id");

-- CreateIndex
CREATE UNIQUE INDEX "Meal_user_id_date_time_key" ON "Meal"("user_id", "date", "time");

-- CreateIndex
CREATE UNIQUE INDEX "Meal_user_id_date_name_key" ON "Meal"("user_id", "date", "name");

-- CreateIndex
CREATE UNIQUE INDEX "MealPlan_user_id_meal_id_date_key" ON "MealPlan"("user_id", "meal_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "ServingUnit_name_food_id_key" ON "ServingUnit"("name", "food_id");

-- CreateIndex
CREATE UNIQUE INDEX "MealMacroGoal_user_meal_preference_id_metric_id_key" ON "MealMacroGoal"("user_meal_preference_id", "metric_id");

-- CreateIndex
CREATE UNIQUE INDEX "KitchenFood_kitchen_id_food_id_key" ON "KitchenFood"("kitchen_id", "food_id");

-- AddForeignKey
ALTER TABLE "FoodMacro" ADD CONSTRAINT "FoodMacro_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodMacro" ADD CONSTRAINT "FoodMacro_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "NutritionalMetric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "NutritionalMetric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodServing" ADD CONSTRAINT "FoodServing_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodServing" ADD CONSTRAINT "FoodServing_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodServing" ADD CONSTRAINT "FoodServing_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "ServingUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodServing" ADD CONSTRAINT "FoodServing_mealPlanId_fkey" FOREIGN KEY ("mealPlanId") REFERENCES "MealPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlan" ADD CONSTRAINT "MealPlan_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlan" ADD CONSTRAINT "MealPlan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServingUnit" ADD CONSTRAINT "ServingUnit_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMealPreference" ADD CONSTRAINT "UserMealPreference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealMacroGoal" ADD CONSTRAINT "MealMacroGoal_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "NutritionalMetric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealMacroGoal" ADD CONSTRAINT "MealMacroGoal_user_meal_preference_id_fkey" FOREIGN KEY ("user_meal_preference_id") REFERENCES "UserMealPreference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KitchenFood" ADD CONSTRAINT "KitchenFood_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KitchenFood" ADD CONSTRAINT "KitchenFood_kitchen_id_fkey" FOREIGN KEY ("kitchen_id") REFERENCES "Kitchen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

