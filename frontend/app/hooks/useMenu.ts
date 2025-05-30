import { useState, useEffect } from 'react';
import { useMenuApi } from '@/lib/api/menu';
import { Food } from '@shared/types/foodTypes';

interface Menu {
    id: string;
    name: string;
    description?: string;
    foods: Food[];
}

interface KitchenFoodResponse {
    food: Food;
    active: boolean;
}

export function useMenu() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { getMenus, getMenuFoods } = useMenuApi();
    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        try {
            setLoading(true);
            const data = await getMenus();
            setMenus(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch menus');
        } finally {
            setLoading(false);
        }
    };

    const searchMenuFoods = async (menuId: string, searchQuery: string = '') => {
        try {
            const responses = await getMenuFoods(menuId, searchQuery);
            return responses.map(response => ({
                ...response.food,
                active: response.active
            }));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch menu foods');
            return [];
        }
    };

    return {
        menus,
        loading,
        error,
        searchMenuFoods,
        refreshMenus: fetchMenus
    };
} 