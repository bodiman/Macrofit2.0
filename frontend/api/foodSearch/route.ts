import { Food } from '@shared/types/foodTypes';
import Constants from 'expo-constants';

const serverAddress = Constants.expoConfig?.extra?.SERVER_ADDRESS;

export async function searchAllFoods(query: string): Promise<Food[]> {
    // console.log(`${serverAddress}/api/foods/search-all?query=${encodeURIComponent(query)}`);
    const response = await fetch(`${serverAddress}/api/foods/search-all?query=${encodeURIComponent(query)}`);
    console.log(response.status);
    if (!response.ok) throw new Error('Failed to fetch foods');
    return response.json();
} 