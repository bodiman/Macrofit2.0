import { useEffect, useState} from 'react';
import { FoodServing } from '@/tempdata';
import storage from '@/app/storage/storage';

function loadShoppingCart() {
    const cart = storage.getString('shoppingCart');

    if (cart) {
        return JSON.parse(cart);
    }
    return [];
}

export default function useShoppingCart() {    
    const [shoppingCart, setShoppingCart] = useState<FoodServing[]>(loadShoppingCart());

    useEffect(() => {
        storage.set('shoppingCart', JSON.stringify(shoppingCart));
    }, [shoppingCart]);

    function clearCart() {
        setShoppingCart([]);
    }

    return {
        shoppingCart,
        setShoppingCart,
        clearCart
    };
} 