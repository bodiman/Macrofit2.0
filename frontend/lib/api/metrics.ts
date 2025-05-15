import { useEffect, useState } from 'react';
import { useApi } from './index';

export function useMetrics() {
  const api = useApi();
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        console.log("fetching metrics");
        const response = await api.get('/api/metrics/nutritional-metrics');
        setMetrics(response);
        setError(null);
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    };


    fetchMetrics();
  }, []);

  const addPreference = async (preference: { metric_id: string; min_value: number | null; max_value: number | null; user_id: number }) => {
    try {
      const response = await api.post('/api/user/preferences', preference);
      return response.json();
    } catch (err) {
      setError(String(err));
      throw err;
    }
  };

  const deletePreference = async (user_id: number, metric_id: string) => {
    try {
      const response = await api.delete(`/api/user/preferences?user_id=${user_id}&metric_id=${metric_id}`);
      return response.json();
    } catch (err) {
      setError(String(err));
      throw err;
    }
  };

  return { metrics, loading, error, addPreference, deletePreference };
} 