import { useAuth } from '@clerk/clerk-expo';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.SERVER_ADDRESS || 'http://10.58.250.107:5050/api';

export const useApi = () => {
    const { getToken, isSignedIn } = useAuth();

    const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
        if (!isSignedIn) {
            console.error('User is not signed in');
            throw new Error('User is not signed in');
        }

        const token = await getToken();
        console.log('Token:', token ? 'Present' : 'Missing'); // Log token presence
        
        if (!token) {
            console.error('No token available');
            throw new Error('No authentication token available');
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers,
        };

        console.log('Making request to:', `${API_URL}${endpoint}`);
        console.log('With headers:', {
            ...headers,
            'Authorization': 'Bearer [REDACTED]' // Don't log the actual token
        });

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers,
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('API Error:', {
                    status: response.status,
                    statusText: response.statusText,
                    error
                });
                throw new Error(`${response.status} Error: ${error.error}`);
            }

            return response.json();
        } catch (error) {
            console.error('Request failed:', error);
            throw error;
        }
    };

    return {
        get: (endpoint: string) => fetchWithAuth(endpoint),
        post: (endpoint: string, data: any) => fetchWithAuth(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        put: (endpoint: string, data: any) => fetchWithAuth(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
        delete: (endpoint: string) => fetchWithAuth(endpoint, {
            method: 'DELETE',
        }),
    };
}; 