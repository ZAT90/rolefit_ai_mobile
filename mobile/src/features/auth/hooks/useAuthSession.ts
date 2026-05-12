import {useEffect, useState} from 'react';
import {getAuthToken} from '../../../shared/lib/secureTokenStorage';
import {useLazyGetMeQuery} from '../services/authApi';

export const useAuthSession = (isAuthenticated: boolean) => {
  const [getMe] = useLazyGetMeQuery();
  const [hasStoredToken, setHasStoredToken] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const checkStoredToken = async () => {
      setIsCheckingToken(true);
      const token = await getAuthToken();

      if (!token) {
        setHasStoredToken(false);
        setIsCheckingToken(false);
        return;
      }

      try {
        await getMe().unwrap();
        setHasStoredToken(true);
      } catch {
        setHasStoredToken(false);
      } finally {
        setIsCheckingToken(false);
      }
    };

    checkStoredToken();
  }, [getMe, isAuthenticated]);

  return {
    hasStoredToken,
    isCheckingToken,
  };
};
