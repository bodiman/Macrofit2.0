import { Food } from '@/tempdata';

// Mock database of foods with values per gram
const mockFoods: Food[] = [
    {
        id: '1',
        name: 'Chicken Breast',
        macros: {
            'calories': 1.65,
            'protein': 0.31,
            'carbohydrates': 0,
            'fat': 0.036,
            'fiber': 0,
            'sodium': 0.74,
            'potassium': 2.56
        }
    },
    {
        id: '2',
        name: 'Brown Rice',
        macros: {
            'calories': 2.16,
            'protein': 0.045,
            'carbohydrates': 0.45,
            'fat': 0.018,
            'fiber': 0.035,
            'fodium': 0.1,
            'potassium': 0.84
        }
    },
    {
        id: '3',
        name: 'Broccoli',
        macros: {
            'calories': 0.55,
            'protein': 0.037,
            'carbohydrates': 0.11,
            'fat': 0.006,
            'fiber': 0.026,
            'sodium': 0.33,
            'potassium': 3.16
        }
    },
    {
        id: '4',
        name: 'salmon',
        macros: {
            'calories': 2.08,
            'protein': 0.22,
            'carbohydrates': 0,
            'fat': 0.13,
            'fiber': 0,
            'sodium': 0.59,
            'potassium': 3.63
        }
    },
    {
        id: '5',
        name: 'Sweet Potato',
        macros: {
            'calories': 0.86,
            'protein': 0.016,
            'carbohydrates': 0.2,
            'fat': 0.001,
            'fiber': 0.03,
            'sodium': 0.55,
            'potassium': 3.37
        }
    },
    {
        id: '6',
        name: 'Sweet Potato',
        macros: {
            'calories': 0.86,
            'protein': 0.016,
            'carbohydrates': 0.2,
            'fat': 0.001,
            'fiber': 0.03,
            'sodium': 0.55,
            'potassium': 3.37
        }
    },
    {
        id: '7',
        name: 'Sweet Potato',
        macros: {
            'calories': 0.86,
            'protein': 0.016,
            'carbohydrates': 0.2,
            'fat': 0.001,
            'fiber': 0.03,
            'sodium': 0.55,
            'potassium': 3.37
        }
    },
    {
        id: '8',
        name: 'Sweet Potato',
        macros: {
            'calories': 0.86,
            'protein': 0.016,
            'carbohydrates': 0.2,
            'fat': 0.001,
            'fiber': 0.03,
            'sodium': 0.55,
            'potassium': 3.37
        }
    }
];

export function searchFoods(query: string): Food[] {
    const searchTerm = query.toLowerCase();

    return mockFoods.filter(food => 
        food.name.toLowerCase().includes(searchTerm)
    );
} 