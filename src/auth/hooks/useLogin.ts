import { useState } from 'react';
import { TokenService } from '../services/TokenService';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (apiKey: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      });

      if (!response.ok) {
        let errMessage = 'Invalid API Key';
        try {
          const errData = await response.json();
          if (errData.detail) errMessage = errData.detail;
        } catch { }
        throw new Error(errMessage);
      }

      const data = await response.json();
      await TokenService.save(data.access_token);
      return true;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
