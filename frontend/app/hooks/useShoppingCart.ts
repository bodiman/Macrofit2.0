import { useEffect, useState } from 'react';
import { FoodServing } from '@shared/types/foodTypes';
import storage from '@/app/storage/storage';
import eventBus from '@/app/storage/eventEmitter';

function loadShoppingCart(): FoodServing[] {
    const cart = storage.getString('shoppingCart');
    return cart ? JSON.parse(cart) : [];
}

export default function useShoppingCart() {
    const [shoppingCart, setShoppingCartState] = useState<FoodServing[]>(loadShoppingCart());

    // 🔁 Sync local state when external changes happen
    useEffect(() => {
        const handleUpdate = () => {
            const updated = loadShoppingCart();
            setShoppingCartState((prev) => {
                const prevStr = JSON.stringify(prev);
                const nextStr = JSON.stringify(updated);
                return prevStr === nextStr ? prev : updated;
            });
        };

        eventBus.on('shoppingCartUpdated', handleUpdate);
        return () => {
            eventBus.off('shoppingCartUpdated', handleUpdate);
        };
    }, []);

    // ✅ Call this to update the cart and sync globally
    const setShoppingCart = (newCart: FoodServing[]) => {
        const oldCart = loadShoppingCart();
        if (JSON.stringify(newCart) !== JSON.stringify(oldCart)) {
            storage.set('shoppingCart', JSON.stringify(newCart));
            eventBus.emit('shoppingCartUpdated');
        }
        setShoppingCartState(newCart);
    };

    const addFoodToCart = (foodServing: FoodServing) => {
        setShoppingCart([...shoppingCart, foodServing]);
    }

    const removeFoodFromCart = (id: string) => {
        const updatedCart = shoppingCart.filter((foodServing) => foodServing.id !== id);
        setShoppingCart(updatedCart);
    }

    const clearCart = () => setShoppingCart([]);

    return {
        shoppingCart,
        setShoppingCart,
        // addFoodToCart,
        // removeFoodFromCart,
        clearCart,
    };
}
