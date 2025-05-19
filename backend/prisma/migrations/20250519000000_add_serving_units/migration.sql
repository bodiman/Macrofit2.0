-- Create the ServingUnit table
CREATE TABLE "ServingUnit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grams" DOUBLE PRECISION NOT NULL,
    "food_id" TEXT NOT NULL,
    CONSTRAINT "ServingUnit_pkey" PRIMARY KEY ("id")
);

-- Add foreign key constraint
ALTER TABLE "ServingUnit" ADD CONSTRAINT "ServingUnit_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add unique constraint
ALTER TABLE "ServingUnit" ADD CONSTRAINT "ServingUnit_name_food_id_key" UNIQUE ("name", "food_id");

-- Create serving units for each food
INSERT INTO "ServingUnit" (id, name, grams, food_id)
SELECT 
    gen_random_uuid()::text as id,
    'grams' as name,
    1 as grams,
    id as food_id
FROM "Food";

INSERT INTO "ServingUnit" (id, name, grams, food_id)
SELECT 
    gen_random_uuid()::text as id,
    'servings' as name,
    serving_size as grams,
    id as food_id
FROM "Food";

-- Remove the serving_size column
ALTER TABLE "Food" DROP COLUMN "serving_size"; 