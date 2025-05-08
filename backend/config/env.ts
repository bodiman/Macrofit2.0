import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const NUTRITIONIX_APP_ID = process.env.NUTRITIONIX_APP_ID;
export const NUTRITIONIX_APP_KEY = process.env.NUTRITIONIX_APP_KEY;
export const NUTRITIONIX_USERNAME = process.env.NUTRITIONIX_USERNAME;