import { Food } from '@shared/types/foodTypes';
import { useApi } from './client';

export const useFoodSearchApi = () => {
    const api = useApi();

    const searchAllFoods = async (query: string): Promise<Food[]> => {
        return api.get(`/api/foods/search-all?query=${encodeURIComponent(query)}`);
    };

    return {
        searchAllFoods,
    };
}; 