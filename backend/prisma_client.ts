import { PrismaClient, Food } from './generated/prisma';


const prisma = new PrismaClient()

export default prisma; 

export type { Food as FoodTable };