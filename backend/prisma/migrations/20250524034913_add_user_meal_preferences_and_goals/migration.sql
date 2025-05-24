-- CreateTable
CREATE TABLE "UserMealPreference" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "default_time" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,

    CONSTRAINT "UserMealPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealMacroGoal" (
    "id" TEXT NOT NULL,
    "user_meal_preference_id" TEXT NOT NULL,
    "metric_id" TEXT NOT NULL,
    "min_value" DOUBLE PRECISION,
    "max_value" DOUBLE PRECISION,

    CONSTRAINT "MealMacroGoal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserMealPreference_user_id_idx" ON "UserMealPreference"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserMealPreference_user_id_name_key" ON "UserMealPreference"("user_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "UserMealPreference_user_id_display_order_key" ON "UserMealPreference"("user_id", "display_order");

-- CreateIndex
CREATE INDEX "MealMacroGoal_user_meal_preference_id_idx" ON "MealMacroGoal"("user_meal_preference_id");

-- CreateIndex
CREATE UNIQUE INDEX "MealMacroGoal_user_meal_preference_id_metric_id_key" ON "MealMacroGoal"("user_meal_preference_id", "metric_id");

-- AddForeignKey
ALTER TABLE "UserMealPreference" ADD CONSTRAINT "UserMealPreference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealMacroGoal" ADD CONSTRAINT "MealMacroGoal_user_meal_preference_id_fkey" FOREIGN KEY ("user_meal_preference_id") REFERENCES "UserMealPreference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealMacroGoal" ADD CONSTRAINT "MealMacroGoal_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "NutritionalMetric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
