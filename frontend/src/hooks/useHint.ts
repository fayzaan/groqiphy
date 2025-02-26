import { useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

export const useHint = () => {
  const [hint, setHint] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHint = async (context: { userId: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/hint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(context)
      });
      const data = await response.json();
      setHint(data.hint);
    } catch (err) {
      console.error('Error fetching hint:', err);
      setError('Failed to fetch hint.');
    } finally {
      setLoading(false);
    }
  };

  return { hint, loading, error, fetchHint };
};