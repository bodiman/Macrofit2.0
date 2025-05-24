import { Food } from '@shared/types/foodTypes';
import { useApi } from './client';

export const useFoodSearchApi = () => {
    const api = useApi();

    const searchAllFoods = async (query: string): Promise<Food[]> => {
        const res = await api.get(`/api/food/search-all?query=${encodeURIComponent(query)}`);
        return res.json();
    };

    return {
        searchAllFoods,
    };
}; 