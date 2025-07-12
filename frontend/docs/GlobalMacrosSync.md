# Global Macros Synchronization System

The global macros synchronization system provides **ultra-fast real-time updates** to the global macros display from any component in the app. This ensures that changes in meal plans, shopping carts, or other components are immediately reflected in the global macros display without waiting for database updates.

## Overview

The system consists of:
- **GlobalMacrosContext**: Manages global macros state with incremental updates
- **useGlobalMacrosSync**: Hook for easy synchronization with ultra-fast functions
- **Automatic cleanup**: Clears macros when components unmount

## Performance Features

🚀 **Ultra-Fast Incremental Updates**: Just add/subtract differences instead of recalculating
⚡ **Instant Feedback**: Changes reflect immediately with simple arithmetic operations
🎯 **No Recalculation**: Avoid expensive macro calculations on every change
📈 **Scalable**: Performance stays constant regardless of number of foods

## How It Works

1. **Global Context**: The `GlobalMacrosProvider` wraps the entire app and manages separate macros for different sources:
   - `loggedMealsMacros`: From the home page (actual logged meals)
   - `mealPlanMacros`: From plan-detail page (planned meals)
   - `shoppingCartMacros`: From shopping cart components
   - `otherMacros`: From any other components

2. **Ultra-Fast Updates**: Components can immediately update their macros using incremental add/subtract functions.

3. **Automatic Combination**: The global display automatically combines all macro sources into a single total.

## Usage

### Ultra-Fast Incremental Updates (Recommended)

```tsx
import { useGlobalMacrosSync } from '@/hooks/useGlobalMacrosSync';

function MyComponent() {
  const { addToMealPlan, subtractFromMealPlan, clearMealPlan } = useGlobalMacrosSync();
  
  // Ultra-fast add food (just add the macros)
  const addFood = (food: any) => {
    addToMealPlan(food.macros); // INSTANT!
  };
  
  // Ultra-fast remove food (just subtract the macros)
  const removeFood = (food: any) => {
    subtractFromMealPlan(food.macros); // INSTANT!
  };
  
  // Ultra-fast quantity change (calculate difference)
  const changeQuantity = (food: any, newQuantity: number) => {
    const oldQuantity = food.quantity || 1;
    const diff = newQuantity - oldQuantity;
    
    if (diff > 0) {
      // Add the difference
      const macroDiff = Object.entries(food.macros).reduce((acc, [key, value]) => {
        acc[key] = (value as number) * diff;
        return acc;
      }, {} as any);
      addToMealPlan(macroDiff); // INSTANT!
    } else if (diff < 0) {
      // Subtract the difference
      const macroDiff = Object.entries(food.macros).reduce((acc, [key, value]) => {
        acc[key] = (value as number) * Math.abs(diff);
        return acc;
      }, {} as any);
      subtractFromMealPlan(macroDiff); // INSTANT!
    }
  };
  
  // Clear when component unmounts
  useEffect(() => {
    return () => clearMealPlan();
  }, [clearMealPlan]);
}
```

### Full Sync Functions (For Complete Replacement)

```tsx
const { syncMealPlanMacros } = useGlobalMacrosSync();

// Use when you need to completely replace all macros
const updateAllMacros = (newMacros: any) => {
  syncMealPlanMacros(newMacros);
};
```

### Available Ultra-Fast Functions

**Add Functions:**
- `addToLoggedMeals(macros)`: Add to logged meals macros
- `addToMealPlan(macros)`: Add to meal plan macros
- `addToShoppingCart(macros)`: Add to shopping cart macros
- `addToOther(macros)`: Add to other macros

**Subtract Functions:**
- `subtractFromLoggedMeals(macros)`: Subtract from logged meals macros
- `subtractFromMealPlan(macros)`: Subtract from meal plan macros
- `subtractFromShoppingCart(macros)`: Subtract from shopping cart macros
- `subtractFromOther(macros)`: Subtract from other macros

### Available Full Sync Functions

- `syncLoggedMealsMacros(macros)`: Replace logged meals macros
- `syncMealPlanMacros(macros)`: Replace meal plan macros
- `syncShoppingCartMacros(macros)`: Replace shopping cart macros
- `syncOtherMacros(macros)`: Replace other macros

### Available Clear Functions

- `clearMealPlan()`: Clear meal plan macros
- `clearShoppingCart()`: Clear shopping cart macros
- `clearOther()`: Clear other macros

### Access Total Macros

```tsx
const { totalMacros } = useGlobalMacrosSync();
// totalMacros contains the combined macros from all sources
```

## Performance Comparison

### ❌ Old Way (Slow)
```tsx
// Recalculate ALL macros from scratch
const allFoods = [...existingFoods, newFood];
const newMacros = calculateAllMacrosOptimized(allFoods, preferences);
syncMealPlanMacros(newMacros); // Expensive calculation
```

### ✅ New Way (Ultra-Fast)
```tsx
// Just add the difference
addToMealPlan(newFood.macros); // Simple addition - INSTANT!
```

## Examples

### Meal Plan Component (Ultra-Fast)

```tsx
function MealPlanComponent() {
  const { addToMealPlan, subtractFromMealPlan, clearMealPlan } = useGlobalMacrosSync();
  const [selectedFoods, setSelectedFoods] = useState([]);
  
  // Ultra-fast add food
  const addFood = (food: any) => {
    setSelectedFoods(prev => [...prev, food]);
    addToMealPlan(food.macros); // INSTANT!
  };
  
  // Ultra-fast remove food
  const removeFood = (foodId: string) => {
    const food = selectedFoods.find(f => f.id === foodId);
    if (food) {
      setSelectedFoods(prev => prev.filter(f => f.id !== foodId));
      subtractFromMealPlan(food.macros); // INSTANT!
    }
  };
  
  // Ultra-fast quantity change
  const changeQuantity = (foodId: string, newQuantity: number) => {
    const food = selectedFoods.find(f => f.id === foodId);
    if (food) {
      const oldQuantity = food.quantity || 1;
      const diff = newQuantity - oldQuantity;
      
      if (diff !== 0) {
        const macroDiff = Object.entries(food.macros).reduce((acc, [key, value]) => {
          acc[key] = (value as number) * diff;
          return acc;
        }, {} as any);
        
        if (diff > 0) {
          addToMealPlan(macroDiff); // INSTANT!
        } else {
          subtractFromMealPlan(macroDiff); // INSTANT!
        }
      }
    }
  };
  
  useEffect(() => {
    return () => clearMealPlan();
  }, [clearMealPlan]);
}
```

### Shopping Cart Component (Ultra-Fast)

```tsx
function ShoppingCart() {
  const { addToShoppingCart, subtractFromShoppingCart, clearShoppingCart } = useGlobalMacrosSync();
  const [cartItems, setCartItems] = useState([]);
  
  const addToCart = (item: any) => {
    setCartItems(prev => [...prev, item]);
    addToShoppingCart(item.macros); // INSTANT!
  };
  
  const removeFromCart = (itemId: string) => {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
      setCartItems(prev => prev.filter(i => i.id !== itemId));
      subtractFromShoppingCart(item.macros); // INSTANT!
    }
  };
  
  useEffect(() => {
    return () => clearShoppingCart();
  }, [clearShoppingCart]);
}
```

## Integration Points

### Home Page
- Uses `syncLoggedMealsMacros` for complete meal replacement
- Updates immediately when meals are fetched from database

### Plan Detail Page
- Uses `addToMealPlan`/`subtractFromMealPlan` for ultra-fast updates
- Updates immediately when quantities change or optimization runs
- Clears macros when leaving the page

### Shopping Cart
- Uses `addToShoppingCart`/`subtractFromShoppingCart` for ultra-fast updates
- Updates immediately when items are added/removed
- Clears macros when cart is emptied or component unmounts

## Benefits

1. **Ultra-Fast Performance**: Simple addition/subtraction instead of recalculation
2. **Instant Feedback**: Changes reflect immediately in the global display
3. **Consistent State**: All components share the same global state
4. **Automatic Cleanup**: Macros are cleared when components unmount
5. **Type Safety**: Full TypeScript support
6. **Scalable**: Performance stays constant regardless of data size

## Best Practices

1. **Use incremental functions** for individual changes (add/remove/quantity)
2. **Use full sync functions** only for complete data replacement
3. **Always clear macros** when components unmount to prevent stale data
4. **Calculate differences** for quantity changes instead of recalculating everything
5. **Handle edge cases** like negative quantities (use Math.max(0, value))

## Migration from Event System

The new system replaces the old event-based system with direct context updates and ultra-fast incremental operations:

- **Better performance**: No event overhead + no recalculation
- **Type safety**: Compile-time checking
- **Easier debugging**: Direct function calls instead of events
- **Automatic cleanup**: No need to manually remove event listeners
- **Ultra-fast updates**: Simple arithmetic instead of complex calculations 