import { Kitchen } from '@shared/types/kitchenTypes';
import { Food } from '@shared/types/foodTypes';
import Constants from 'expo-constants';
import { toMacros } from '@/lib/utils/toMacros';
import { dbFood } from '@shared/types/databaseTypes';

const serverAddress = Constants.expoConfig?.extra?.SERVER_ADDRESS;

export async function getMenus(): Promise<Kitchen[]> {
    const response = await fetch(serverAddress + '/api/menus');
    if (!response.ok) {
        throw new Error('Failed to fetch menus');
    }
    return response.json();
}

export async function getMenuFoods(menuId: string, search?: string): Promise<Food[]> {
    const url = new URL('/api/menus/' + menuId + '/foods', serverAddress);
    if (search) {
        url.searchParams.append('search', search);
    }
    
    const response = await fetch(url.toString());
    // console.log("this is the response", response.json());
    if (!response.ok) {
        throw new Error('Failed to fetch menu foods');
    }
    const data = await response.json();
    return data.map((food: dbFood) => ({
        ...food,
        macros: toMacros(food.macros)
    }));
} 