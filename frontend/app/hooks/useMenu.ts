import { useState, useEffect } from 'react';
import { useMenuApi } from '@/lib/api/menu';
import { Food } from '@shared/types/foodTypes';

interface Menu {
    id: string;
    name: string;
    description?: string;
    foods: Food[];
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
            const foods = await getMenuFoods(menuId, searchQuery);
            return foods;
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