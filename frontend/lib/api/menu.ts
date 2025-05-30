import { Kitchen } from '@shared/types/kitchenTypes';
import { Food } from '@shared/types/foodTypes';
import { useApi } from './client';

interface CreateKitchenRequest {
    name: string;
    description?: string;
    foods: Food[];
}

interface KitchenFoodResponse {
    food: Food;
    active: boolean;
}

export function useMenuApi() {
    const api = useApi();

    return {
        getMenus: async (): Promise<Kitchen[]> => {
            const response = await api.get('/api/menus');
            return response.json();
        },

        getMenuFoods: async (menuId: string, search?: string): Promise<KitchenFoodResponse[]> => {
            const response = await api.get(`/api/menus/${menuId}/foods${search ? `?search=${search}` : ''}`);
            return response.json();
        },

        createKitchen: async (data: CreateKitchenRequest): Promise<Kitchen> => {
            const response = await api.post('/api/menus', data);
            return response.json();
        },

        toggleFoodActive: async (kitchenId: string, foodId: string, active: boolean): Promise<Food & { active: boolean }> => {
            const response = await api.put(`/api/menus/${kitchenId}/foods/${foodId}/active`, { active });
            return response.json();
        }
    };
} 