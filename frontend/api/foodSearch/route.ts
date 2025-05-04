import { Food } from '@shared/types/foodTypes';
import Constants from 'expo-constants';

const serverAddress = Constants.expoConfig?.extra?.SERVER_ADDRESS;

export async function searchFoods(query: string): Promise<Food[]> {
    try {
        // console.log(`${serverAddress}/api/foods/search?query=${encodeURIComponent(query)}`);
        const response = await fetch(`${serverAddress}/api/foods/search?query=${encodeURIComponent(query)}`, {
            method: 'GET',
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch foods');
        }

        const foods = await response.json();
        return foods;
    } catch (error) {
        console.error('Error searching foods:', error);
        return [];
    }
} 