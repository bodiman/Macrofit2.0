import { Kitchen } from '@shared/types/kitchenTypes';
import { Food } from '@shared/types/foodTypes';
import { toMacros } from '@/lib/utils/toMacros';
import { dbFood } from '@shared/types/databaseTypes';
import { useApi } from './client';

interface CreateKitchenRequest {
    name: string;
    description?: string;
    foods: Food[];
}

export const useMenuApi = () => {
    const api = useApi();

    const getMenus = async (): Promise<Kitchen[]> => {
        const res = await api.get('/api/menus');
        return res.json();
    };

    const getMenuFoods = async (menuId: string, search?: string): Promise<Food[]> => {
        const endpoint = search 
            ? `/api/menus/${menuId}/foods?search=${encodeURIComponent(search)}`
            : `/api/menus/${menuId}/foods`;
            
        const res = await api.get(endpoint);
        return res.json();
    };

    const createKitchen = async (data: CreateKitchenRequest): Promise<Kitchen> => {
        const res = await api.post('/api/menus', data);
        return res.json();
    };

    return {
        getMenus,
        getMenuFoods,
        createKitchen,
    };
}; 