import { useState, useEffect } from 'react';
import { getMenus, getMenuFoods } from '@/api/menu/route';
import { Food } from '@shared/types/foodTypes';
import { toMacros } from '@/lib/utils/toMacros';

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