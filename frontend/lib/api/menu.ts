import { Kitchen } from '@shared/types/kitchenTypes';
import { Food } from '@shared/types/foodTypes';
import { toMacros } from '@/lib/utils/toMacros';
import { dbFood } from '@shared/types/databaseTypes';
import { useApi } from './client';

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

    return {
        getMenus,
        getMenuFoods,
    };
}; 