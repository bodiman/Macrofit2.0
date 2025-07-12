import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useGlobalMacrosSync } from '@/hooks/useGlobalMacrosSync';
import { calculateAllMacrosOptimized } from '@/utils/optimizedMacroCalculation';
import Colors from '@/styles/colors';

// Example component showing how to sync shopping cart macros with global display
export default function ExampleShoppingCart() {
  const { syncShoppingCartMacros, clearShoppingCart } = useGlobalMacrosSync();
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Example cart items
  const exampleItems = [
    {
      id: '1',
      name: 'Chicken Breast',
      quantity: 2,
      unit: { name: 'pieces', grams: 100 },
      food: {
        macros: { calories: 165, protein: 31, carbs: 0, fat: 3.6 }
      }
    },
    {
      id: '2',
      name: 'Brown Rice',
      quantity: 1,
      unit: { name: 'cup', grams: 195 },
      food: {
        macros: { calories: 216, protein: 5, carbs: 45, fat: 1.8 }
      }
    }
  ];

  // Calculate cart macros and sync with global display
  useEffect(() => {
    if (cartItems.length > 0) {
      const cartMacros = calculateAllMacrosOptimized(
        [{ id: 'cart', name: 'Cart', servings: cartItems }],
        []
      );
      syncShoppingCartMacros(cartMacros);
    } else {
      syncShoppingCartMacros({});
    }
  }, [cartItems, syncShoppingCartMacros]);

  // Clear cart macros when component unmounts
  useEffect(() => {
    return () => {
      clearShoppingCart();
    };
  }, [clearShoppingCart]);

  const addToCart = (item: any) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart Example</Text>
      
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={() => addToCart(exampleItems[0])}>
          <Text style={styles.buttonText}>Add Chicken</Text>
        </Pressable>
        
        <Pressable style={styles.button} onPress={() => addToCart(exampleItems[1])}>
          <Text style={styles.buttonText}>Add Rice</Text>
        </Pressable>
        
        <Pressable style={styles.clearButton} onPress={clearCart}>
          <Text style={styles.buttonText}>Clear Cart</Text>
        </Pressable>
      </View>

      <View style={styles.cartContainer}>
        <Text style={styles.cartTitle}>Cart Items:</Text>
        {cartItems.map((item, index) => (
          <View key={`${item.id}-${index}`} style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>
              {item.quantity} {item.unit.name}
            </Text>
            <Pressable 
              style={styles.removeButton}
              onPress={() => removeFromCart(item.id)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </Pressable>
          </View>
        ))}
        {cartItems.length === 0 && (
          <Text style={styles.emptyCart}>Cart is empty</Text>
        )}
      </View>

      <Text style={styles.note}>
        Note: Cart macros are automatically synced with the global macros display above!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  button: {
    padding: 8,
    backgroundColor: Colors.blue,
    borderRadius: 6,
    flex: 1,
  },
  clearButton: {
    padding: 8,
    backgroundColor: Colors.orange,
    borderRadius: 6,
    flex: 1,
  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
  cartContainer: {
    borderWidth: 1,
    borderColor: Colors.coolgray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  cartTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemName: {
    fontSize: 14,
    color: Colors.black,
    flex: 1,
  },
  itemQuantity: {
    fontSize: 12,
    color: Colors.gray,
    marginHorizontal: 8,
  },
  removeButton: {
    padding: 4,
    backgroundColor: Colors.orange,
    borderRadius: 4,
  },
  removeButtonText: {
    color: Colors.white,
    fontSize: 10,
  },
  emptyCart: {
    fontSize: 14,
    color: Colors.gray,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 8,
  },
  note: {
    fontSize: 12,
    color: Colors.gray,
    fontStyle: 'italic',
    textAlign: 'center',
  },
}); 