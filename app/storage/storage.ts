import { MMKV } from 'react-native-mmkv';
import { bacon, hotdog, sandwich, fried, burrito, createInstance } from '@/tempdata'


export const storage = new MMKV();

export const meals = [
    {
        id: '0',
        name: "Breakfast",
        hour: 8,
        foods: [createInstance(bacon), createInstance(hotdog), createInstance(sandwich)],
    },
    {
        id: '1',
        name: "Lunch",
        hour: 13,
        foods: [createInstance(burrito), createInstance(bacon), createInstance(hotdog)],
    },
    {
        id: '2',
        name: "Dinner",
        hour: 18,
        foods: [createInstance(burrito), createInstance(sandwich), createInstance(fried), createInstance(bacon)],
    }
]