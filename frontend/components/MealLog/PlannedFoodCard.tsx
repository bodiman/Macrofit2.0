import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FoodServing } from '@shared/types/foodTypes';
import Colors from '@/styles/colors';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface PlannedFoodCardProps {
  foodServing: FoodServing;
  remainingQuantity: number;
  isBeingReduced?: boolean;
  onPress: () => void;
}

export default function PlannedFoodCard({ 
  foodServing, 
  remainingQuantity, 
  isBeingReduced, 
  onPress 
}: PlannedFoodCardProps) {
  return (
    <Pressable 
      style={[
        styles.card, 
        { backgroundColor: isBeingReduced ? Colors.orange : Colors.green }
      ]} 
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.foodName} numberOfLines={1} ellipsizeMode="tail">
            {foodServing.food.name}
          </Text>
          <Text style={styles.quantity}>
            {remainingQuantity.toFixed(1)} {foodServing.unit.name}
          </Text>
        </View>
        {isBeingReduced && (
          <MaterialIcons name="trending-down" size={16} color={Colors.white} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 2,
  },
  quantity: {
    fontSize: 12,
    color: Colors.white,
    opacity: 0.9,
  },
}); 