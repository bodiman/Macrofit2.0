-- CreateTable
CREATE TABLE "NutritionalMetric" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "unit" TEXT NOT NULL,

    CONSTRAINT "NutritionalMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "metric_id" INTEGER NOT NULL,
    "min_value" DOUBLE PRECISION,
    "max_value" DOUBLE PRECISION,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NutritionalMetric_name_key" ON "NutritionalMetric"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_user_id_metric_id_key" ON "UserPreference"("user_id", "metric_id");

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "NutritionalMetric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
