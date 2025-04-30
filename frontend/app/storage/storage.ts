import { MMKV } from 'react-native-mmkv';
import { bacon, hotdog, sandwich, fried, burrito } from '@/tempdata'


const storage = new MMKV();
export default storage

export const meals = [
    {
        id: '0',
        name: "Breakfast",
        hour: 8,
        foods: [],
    },
    {
        id: '1',
        name: "Lunch",
        hour: 13,
        foods: [],
    },
    {
        id: '2',
        name: "Dinner",
        hour: 18,
        foods: [],
    }
]